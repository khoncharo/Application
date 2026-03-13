import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/providers/prisma.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { SYSTEM_PROMPT } from '../prompts/system-prompt';
import { IGroqMessage } from '../interfaces/groq.interfaces';
import {
  fetchAllEvents,
  fetchAttendingEvents,
  fetchOrganizedEvents,
} from '../repositories/ai-assistant.repository';
import {
  fmt,
  buildEventSection,
  buildAttendingSection,
} from '../utils/context.utils';
import { GroqService } from './groq.service';

const MAX_HISTORY = 10;

@Injectable()
export class AiAssistantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly groqService: GroqService,
  ) {}

  public async ask(
    question: string,
    user: ActiveUserData,
    history: IGroqMessage[] = [],
  ) {
    const context = await this.buildContext(user);

    const data = await this.groqService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT(context) },
        ...history.slice(-MAX_HISTORY),
        { role: 'user', content: question.trim() },
      ],
      temperature: 0.3,
      max_tokens: 512,
    });

    const answer =
      data.choices?.[0]?.message?.content?.trim() ?? 'No response.';

    return { answer };
  }

  private async buildContext(user: ActiveUserData): Promise<string> {
    const now = new Date();

    const [allEvents, attending, organized] = await Promise.all([
      fetchAllEvents(this.prisma),
      fetchAttendingEvents(this.prisma, user.sub, now),
      fetchOrganizedEvents(this.prisma, user.sub),
    ]);

    const publicEvents = allEvents.filter((e) => e.type === 'PUBLIC');
    const privateEvents = allEvents.filter((e) => e.type === 'PRIVATE');

    return [
      `## Current date and time\n${fmt(now)}`,
      buildEventSection('Public events', publicEvents),
      buildEventSection('Private events', privateEvents),
      buildAttendingSection(attending),
      buildEventSection('Events I organize', organized),
    ].join('\n\n');
  }
}
