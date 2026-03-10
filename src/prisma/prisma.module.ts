import { Global, Module } from '@nestjs/common';
import { PrismaService } from './providers/prisma.service';
import { DatabaseConfigService } from 'src/database/database-config.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
