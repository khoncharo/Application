import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GroqConfigService } from 'src/ai-assistant/config/groq-config.service';
import { IGroqMessage, IGroqResponse } from '../interfaces/groq.interfaces';

export interface GroqRequestOptions {
  messages: IGroqMessage[];
  temperature?: number;
  max_tokens?: number;
}

@Injectable()
export class GroqService {
  constructor(private readonly groqConfig: GroqConfigService) {}

  async chat(options: GroqRequestOptions): Promise<IGroqResponse> {
    const { apiKey, model, apiBaseUrl } = this.groqConfig.config;
    const apiChatUrl = '/openai/v1/chat/completions';

    const res = await fetch(`${apiBaseUrl}${apiChatUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, ...options }),
    });

    if (!res.ok) {
      throw new InternalServerErrorException(`Groq error ${res.status}`);
    }

    return res.json() as Promise<IGroqResponse>;
  }
}
