import { Injectable } from '@nestjs/common';
import { IDatabaseConfig } from './datavase-config.intereface';
import { validateEnvConfig } from '../config/validate-config';
import { DatabaseConfig } from './database.config';

@Injectable()
export class DatabaseConfigService {
  public readonly config: IDatabaseConfig;

  constructor() {
    this.config = this.initialize();
  }

  private initialize(): IDatabaseConfig {
    const envValues = {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      URL: process.env.DATABASE_URL,
    };

    const databaseConfig = validateEnvConfig(DatabaseConfig, envValues);

    return databaseConfig;
  }
}
