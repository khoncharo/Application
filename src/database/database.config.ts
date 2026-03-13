import { IDatabaseConfig } from './database-config.intereface';
import { IsString } from 'class-validator';

export class DatabaseConfig implements IDatabaseConfig {
  @IsString()
  URL: string;
}
