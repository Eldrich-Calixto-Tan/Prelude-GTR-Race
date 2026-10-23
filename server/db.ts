
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

let pool: InstanceType<typeof Pool> | undefined;

export class DatabaseConfigurationError extends Error {
  constructor() {
    super("DATABASE_URL must be set to use the leaderboard.");
    this.name = "DatabaseConfigurationError";
  }
}

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new DatabaseConfigurationError();
  }

  pool ??= new Pool({ connectionString });
  return drizzle(pool, { schema });
}
