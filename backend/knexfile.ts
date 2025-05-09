import { config } from 'dotenv';
import { Knex } from 'knex';

config();

const defaultConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  } as Knex.PgConnectionConfig,
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
};

export default {
  development: defaultConfig,
  test: {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection as Knex.PgConnectionConfig,
      database: `${process.env.DB_NAME}_test`,
    },
  },
  production: {
    ...defaultConfig,
    pool: {
      min: 2,
      max: 10,
    },
  },
};