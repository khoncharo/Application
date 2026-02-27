import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { BcryptgModule } from 'src/bcrypting/bcrypt.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [BcryptgModule],
})
export class UsersModule {}
