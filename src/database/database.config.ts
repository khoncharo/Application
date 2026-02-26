import { IDatabaseConfig } from './datavase-config.intereface';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DatabaseConfig implements IDatabaseConfig {
  @IsString()
  host: string;

  @IsNumber()
  @Type(() => Number)
  port: number;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  URL: string;
}
