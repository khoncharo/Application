import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { CreateAuthDto } from './dtos/createa-auth.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ApiTags } from '@nestjs/swagger';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshSwagger } from './swagger/refresh.swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  @LoginSwagger()
  public async LogIn(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.LogIn(createAuthDto);
  }

  @Post('refresh')
  @Auth(AuthType.None)
  @RefreshSwagger()
  async refresh(@Body('refreshToken') refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
