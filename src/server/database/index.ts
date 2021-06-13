import { join } from 'path';
import { Options, Sequelize } from 'sequelize';

export const sequelize = new Sequelize(databaseConfig());

export async function recreateDatabase(): Promise<void> {
  if (process.env['NODE_ENV'] === 'production') {
    console.error(`Tried recreating the production database. This won't have any effect.`);

    return;
  }

  await sequelize.drop();

  await sequelize.sync({ force: true });
}

function databaseConfig(): Options {
  if (process.env['NODE_ENV'] === 'production') {
    return {
      dialect: 'sqlite',
      storage: databasePath()
    };
  }

  if (process.env['NODE_ENV'] === 'test') {
    return {
      dialect: 'sqlite',
      logging: false,
      storage: ':memory:'
    };
  }

  return {
    dialect: 'sqlite',
    storage: databasePath()
  };
}

function databasePath(): string {
  return join(__dirname, '..', '..', '..', databaseName());
}

function databaseName(): string {
  if (process.env['NODE_ENV'] === 'production') {
    return 'production.sqlite';
  }

  if (process.env['NODE_ENV'] === 'test') {
    return 'test.sqlite';
  }

  return 'development.sqlite';
}
