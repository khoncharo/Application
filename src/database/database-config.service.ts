import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { IDatabaseConfig } from './database-config.intereface';
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
      URL: process.env.DATABASE_URL,
    };

    const databaseConfig = validateEnvConfig(DatabaseConfig, envValues);

    return databaseConfig;
  }
}
