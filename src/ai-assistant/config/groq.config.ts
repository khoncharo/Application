import { IsString } from 'class-validator';
import { IGroqConfig } from 'src/ai-assistant/config/groq-config.intereface';

export class GroqConfig implements IGroqConfig {
  @IsString()
  apiKey: string;

  @IsString()
  model: string;

  @IsString()
  apiBaseUrl: string;
}
