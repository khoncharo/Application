import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
