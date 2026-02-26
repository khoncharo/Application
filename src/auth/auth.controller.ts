import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { CreateAuthDto } from './dto/CreateAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp() {
    await this.authService.signUp();
  }

  @Post('sign-in')
  public async signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService(createAuthDto);
  }

  @Post('logout')
  public async logout() {
    await this.authService.logout();
  }

  @Post('refresh-token')
  public async refreshToekn() {
    await this.authService.refreshToekn();
  }
}
