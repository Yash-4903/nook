import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "nook",
    password: "nook_dev_password",
    database: "nook"
});

export const db = drizzle(pool);