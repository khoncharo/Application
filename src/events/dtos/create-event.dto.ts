import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  //change to just date and add time

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNumber()
  capacity?: number;
}
