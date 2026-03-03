import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EventType } from '@prisma/client';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateTime: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsEnum(EventType)
  type: EventType;
}
