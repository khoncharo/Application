import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './providers/jwt.service';
import { BcryptgModule } from 'src/bcrypting/bcrypt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    UsersModule,
    BcryptgModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService],
})
export class AuthModule {}
