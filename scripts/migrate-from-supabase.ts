/**
 * One-off data migration: copies every row out of the live Supabase
 * Postgres project and into the new Neon database, using Drizzle's schema
 * as the target shape. Safe to re-run — each run truncates the target
 * tables it's about to repopulate before inserting, so this can be run
 * once for Preview testing and again right before the Production cutover
 * to pick up any admin edits made in between.
 *
 * Usage:
 *   SUPABASE_DB_URL=postgres://... DATABASE_URL=postgres://... npm run migrate-from-supabase
 *
 * SUPABASE_DB_URL must be the Supabase project's direct Postgres
 * connection string (Project Settings > Database > Connection string >
 * URI, "Direct connection"), using the postgres superuser so the read
 * bypasses RLS entirely — this script needs the full dataset, not just
 * what an anon/authenticated role could see.
 */
import { config } from "dotenv";
import postgres from "postgres";

config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/lib/db/schema";

const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;
const DATABASE_URL = process.env.DATABASE_URL;

if (!SUPABASE_DB_URL) throw new Error("SUPABASE_DB_URL is not set");
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const source = postgres(SUPABASE_DB_URL, { max: 1 });
const targetClient = postgres(DATABASE_URL, { max: 1, prepare: false });
const target = drizzle(targetClient, { schema });

async function copyTable<T extends Record<string, unknown>>(
  label: string,
  table: Parameters<typeof target.delete>[0],
  rows: T[],
) {
  await target.delete(table);
  if (rows.length > 0) {
    await target.insert(table).values(rows);
  }
  console.log(`  ${label}: ${rows.length} row(s)`);
}

async function main() {
  console.log("Reading from Supabase...");

  const [
    churchSettingsRows,
    servicesRows,
    ministriesRows,
    leadershipRows,
    statementOfFaithRows,
    eventsRows,
    postsRows,
    messagesRows,
    subscribersRows,
    testimoniesRows,
    galleryImagesRows,
    devotionalsRows,
    eventRsvpsRows,
    authUsersRows,
  ] = await Promise.all([
    source`select * from public.church_settings`,
    source`select * from public.services`,
    source`select * from public.ministries`,
    source`select * from public.leadership`,
    source`select * from public.statement_of_faith`,
    // start_datetime/end_datetime never existed on the live Supabase
    // table (see schema.ts comment) — they simply won't be present here.
    source`select * from public.events`,
    source`select * from public.posts`,
    source`select * from public.messages`,
    source`select * from public.subscribers`,
    source`select * from public.testimonies`,
    source`select * from public.gallery_images`,
    source`select * from public.devotionals`,
    source`select * from public.event_rsvps`,
    source`select id, email, encrypted_password from auth.users`,
  ]);

  console.log("Writing to Neon...");

  // Children (FK-dependent) before parents when deleting isn't required
  // here since we delete per-table, but event_rsvps must be deleted
  // before events to avoid a transient FK violation, and inserted after.
  await copyTable("event_rsvps", schema.eventRsvps, []); // clear first, repopulated last
  await copyTable("church_settings", schema.churchSettings, churchSettingsRows as unknown as never[]);
  await copyTable("services", schema.services, servicesRows as unknown as never[]);
  await copyTable("ministries", schema.ministries, ministriesRows as unknown as never[]);
  await copyTable("leadership", schema.leadership, leadershipRows as unknown as never[]);
  await copyTable("statement_of_faith", schema.statementOfFaith, statementOfFaithRows as unknown as never[]);
  await copyTable("events", schema.events, eventsRows as unknown as never[]);
  await copyTable("posts", schema.posts, postsRows as unknown as never[]);
  await copyTable("messages", schema.messages, messagesRows as unknown as never[]);
  await copyTable("subscribers", schema.subscribers, subscribersRows as unknown as never[]);
  await copyTable("testimonies", schema.testimonies, testimoniesRows as unknown as never[]);
  await copyTable("gallery_images", schema.galleryImages, galleryImagesRows as unknown as never[]);
  await copyTable("devotionals", schema.devotionals, devotionalsRows as unknown as never[]);
  await copyTable("event_rsvps", schema.eventRsvps, eventRsvpsRows as unknown as never[]);

  const admins = authUsersRows.map((u) => ({
    id: u.id as string,
    email: u.email as string,
    password_hash: u.encrypted_password as string,
  }));
  await copyTable("admins", schema.admins, admins);

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await source.end();
    await targetClient.end();
  });
