import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default config;
