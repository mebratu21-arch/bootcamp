import knex from "knex";
import { config } from "dotenv";

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, NODE_ENV } = process.env;

export const dbneon = knex({
  client: "pg",
  connection: {
    host: PGHOST,
    port: PGPORT || 5432,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    ssl: NODE_ENV === "production" ? { rejectUnauthorized: true } : { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 10,
  },
});

// Test database connection
dbneon.raw("SELECT 1")
  .then(() => {
    console.log("✓ Database connected successfully");
  })
  .catch((err) => {
    console.error("✗ Database connection failed:", err.message);
  });