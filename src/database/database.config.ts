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
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsString()
  URL: string;
}
