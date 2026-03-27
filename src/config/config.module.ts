import { Module } from '@nestjs/common';
import { DatabaseConfigService } from 'src/database/database-config.service';
import { GroqConfigService } from 'src/ai-assistant/config/groq-config.service';

@Module({
  providers: [DatabaseConfigService, GroqConfigService],
  exports: [DatabaseConfigService, GroqConfigService],
})
export class ConfigModule {}
