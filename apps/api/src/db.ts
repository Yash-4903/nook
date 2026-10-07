import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: databaseUrl,
});

export const db = drizzle(pool);