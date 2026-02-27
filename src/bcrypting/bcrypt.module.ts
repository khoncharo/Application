import { Module } from '@nestjs/common';
import { BcryptService } from 'src/bcrypting/providers/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptgModule {}
