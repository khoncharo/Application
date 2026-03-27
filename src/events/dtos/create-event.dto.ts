import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, { message: 'An event can have at most 5 tags' })
  @IsUUID('4', { each: true })
  tagIds?: string[];
}
