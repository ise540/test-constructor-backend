import type { DBconfig } from '../db';

const DB_NAME = process.env.DB_NAME || 'constructor-db';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'qwerty';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 5432;

export { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT };
export const config: DBconfig = { name: DB_NAME, user: DB_USER, password: DB_PASSWORD, host: DB_HOST, port: DB_PORT };
 