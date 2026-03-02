import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { CreateAuthDto } from './dto/createa-auth.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async LogIn(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.LogIn(createAuthDto);
  }
}
