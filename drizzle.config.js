import * as dotenv from 'dotenv';
dotenv.config();

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/db/schema/schema.js',
  out: './src/db/migrations',
  driver: 'mysql2',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  verbose: true,
  strict: true,
};
