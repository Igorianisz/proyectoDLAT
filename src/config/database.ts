import pg from "pg";

const { Pool } = pg;
// const connectionString = process.env.DATABASE_URL;

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:root@localhost:5434/dbtest"

export const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
});