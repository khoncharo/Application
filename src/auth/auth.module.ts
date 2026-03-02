import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './providers/jwt.service';
import { BcryptgModule } from 'src/bcrypting/bcrypt.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationGuard } from './guards/authentification.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenGuard, AuthenticationGuard],
  imports: [
    UsersModule,
    BcryptgModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, AccessTokenGuard, AuthenticationGuard],
})
export class AuthModule {}
