import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const validateEnvConfig = <T extends object>(
  cls: new () => T,
  input: unknown,
) => {
  const config = plainToInstance(cls, input);

  const errors = validateSync(config);

  if (errors.length > 0) {
    const detailedMessage = errors
      .flatMap(({ constraints }) => Object.values(constraints!))
      .join('\n');
    throw new Error(`Invalid ${cls.name}.\n` + detailedMessage);
  }

  return config;
};
