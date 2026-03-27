import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { AiAssistantService } from './providers/ai-assistant.service';
import { AskAssistantDto } from './dtos/ask-assistant.dto';

@ApiTags('Assistant')
@Controller('assistant')
export class AiAssistantController {
  constructor(private readonly assistantService: AiAssistantService) {}

  @Post('ask')
  @Auth(AuthType.Bearer)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  public ask(@Body() dto: AskAssistantDto, @ActiveUser() user: ActiveUserData) {
    return this.assistantService.ask(dto.question, user, dto.history ?? []);
  }
}
