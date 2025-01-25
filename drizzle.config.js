import * as dotenv from 'dotenv';
dotenv.config();

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/db/schema/schema.js',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
};
