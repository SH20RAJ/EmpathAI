import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema/schema.js';

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || '82.197.82.30',
  user: process.env.DB_USER || 'u212553073_empathai',
  password: process.env.DB_PASSWORD || '2S?+5nGBcQj',
  database: process.env.DB_NAME || 'u212553073_empathai',
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
