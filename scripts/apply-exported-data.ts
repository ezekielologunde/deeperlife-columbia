/**
 * Loads the JSON files under scripts/.data/ (exported from the live
 * Supabase project via the Supabase MCP's execute_sql, since the direct
 * Postgres connection string/password for that project wasn't available)
 * and inserts them into Neon via Drizzle, using the same table-by-table,
 * truncate-then-insert approach as migrate-from-supabase.ts.
 *
 * Usage: npm run apply-exported-data
 */
import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/lib/db/schema";

config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const DATA_DIR = path.join(process.cwd(), "scripts", ".data");

const client = postgres(DATABASE_URL, { max: 1, prepare: false });
const db = drizzle(client, { schema });

function loadJson(name: string): Record<string, unknown>[] {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${name}.json`), "utf8"));
}

async function copyTable(
  label: string,
  table: Parameters<typeof db.delete>[0],
  rows: Record<string, unknown>[],
) {
  await db.delete(table);
  if (rows.length > 0) {
    await db.insert(table).values(rows as never[]);
  }
  console.log(`  ${label}: ${rows.length} row(s)`);
}

async function main() {
  console.log("Writing to Neon...");

  await copyTable("event_rsvps", schema.eventRsvps, []); // clear first, repopulated last
  await copyTable("church_settings", schema.churchSettings, loadJson("church_settings"));
  await copyTable("services", schema.services, loadJson("services"));
  await copyTable("ministries", schema.ministries, loadJson("ministries"));
  await copyTable("leadership", schema.leadership, loadJson("leadership"));
  await copyTable("statement_of_faith", schema.statementOfFaith, loadJson("statement_of_faith"));
  await copyTable("events", schema.events, loadJson("events"));
  await copyTable("posts", schema.posts, loadJson("posts"));
  await copyTable("messages", schema.messages, loadJson("messages"));
  await copyTable("subscribers", schema.subscribers, loadJson("subscribers"));
  await copyTable("testimonies", schema.testimonies, loadJson("testimonies"));
  await copyTable("gallery_images", schema.galleryImages, loadJson("gallery_images"));
  await copyTable("devotionals", schema.devotionals, loadJson("devotionals"));
  await copyTable("event_rsvps", schema.eventRsvps, loadJson("event_rsvps"));
  await copyTable("admins", schema.admins, loadJson("admins"));

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
