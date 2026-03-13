import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class MessageDto {
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @IsString()
  @MaxLength(500)
  content: string;
}

export class AskAssistantDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  question: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  history?: MessageDto[];
}
