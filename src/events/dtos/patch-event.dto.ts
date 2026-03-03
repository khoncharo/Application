import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class PatchEventDto {
  @IsUUID()
  id: string;

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
  @IsNumber()
  capacity?: number;
}
