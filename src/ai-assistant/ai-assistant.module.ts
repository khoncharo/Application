import { Module } from '@nestjs/common';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './providers/ai-assistant.service';
import { ConfigModule } from 'src/config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { GroqService } from './providers/groq.service';

@Module({
  controllers: [AiAssistantController],
  providers: [AiAssistantService, GroqService],
  imports: [ConfigModule, ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])],
})
export class AiAssistantModule {}
