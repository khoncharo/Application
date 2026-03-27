import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => o.capacity !== null)
  @IsOptional()
  @IsNumber()
  capacity?: number | null;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5, { message: 'An event can have at most 5 tags' })
  @IsUUID('4', { each: true })
  tagIds?: string[];
}
