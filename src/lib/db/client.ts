import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __dbClient: postgres.Sql | undefined;
}

// Reuse the connection across hot reloads in dev instead of opening a new
// pool on every module reload. `prepare: false` because DATABASE_URL is
// expected to be Neon's pooled (PgBouncer transaction-mode) connection
// string, which doesn't support session-level prepared statements.
const client =
  global.__dbClient ??
  postgres(process.env.DATABASE_URL!, { max: 10, prepare: false });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = client;
}

export const db = drizzle(client, { schema });
