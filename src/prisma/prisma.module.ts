import { Module } from '@nestjs/common';
import { PrismaService } from './providers/prisma.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
