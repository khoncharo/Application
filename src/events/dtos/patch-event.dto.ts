import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { EventType } from '@prisma/client';

export class PatchEventDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateTime?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(EventType)
  type?: EventType;

  @ValidateIf((o) => o.capacity !== null)
  @IsOptional()
  @IsNumber()
  capacity?: number | null;
}
