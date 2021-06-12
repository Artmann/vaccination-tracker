import fs from 'fs';
import { join } from 'path';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath()
});

export async function recreateDatabase(): Promise<void> {
  if (process.env['NODE_ENV'] === 'production') {
    console.error(`Tried recreating the production database. This won't have any effect.`);

    return;
  }

  const path = databasePath();

  try {
    await fs.promises.unlink(path);
  } catch (error) {}

  await sequelize.sync();
}

function databasePath(): string {
  return join(__dirname, '..', '..', '..', databaseName());
}

function databaseName(): string {
  if (process.env['NODE_ENV'] === 'production') {
    return 'production.sqlite'
  }

  if (process.env['NODE_ENV'] === 'test') {
    return 'test.sqlite'
  }

  return 'development.sqlite'
}
