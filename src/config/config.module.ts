import { Module } from '@nestjs/common';
import { DatabaseConfigService } from 'src/database/database-config.service';

@Module({
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class ConfigModule {}
