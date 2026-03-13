import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { validateEnvConfig } from '../../config/validate-config';
import { GroqConfig } from './groq.config';
import { IGroqConfig } from 'src/ai-assistant/config/groq-config.intereface';

@Injectable()
export class GroqConfigService {
  public readonly config: IGroqConfig;

  constructor() {
    this.config = this.initialize();
  }

  private initialize(): IGroqConfig {
    const envValues = {
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL,
      apiBaseUrl: process.env.GROQ_BASE_URL,
    };

    const groqConfig = validateEnvConfig(GroqConfig, envValues);

    return groqConfig;
  }
}
