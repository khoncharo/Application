import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/providers/users.service';
import { CreateAuthDto } from '../dto/createa-auth.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from './jwt.service';
import { JwtService as BaseJwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { ConfigType } from '@nestjs/config';
import { BcryptService } from 'src/bcrypting/providers/bcrypt.service';

@Injectable()
@ApiTags('Auth')
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly baseJwtService: BaseJwtService,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async LogIn(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findOneByEmail(createAuthDto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isEqual = await this.bcryptService.comparePassword(
      createAuthDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new BadRequestException('Invalid credentials');
    }

    return await this.jwtService.generateTokens(user);
  }

  public isAuth() {
    return true;
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.baseJwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOneById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      return await this.jwtService.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
