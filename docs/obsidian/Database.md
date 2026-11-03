---
project: deeperlife-columbia
type: database
status: active
last_updated: 2026-11-03
tags: [project/deeperlife-columbia]
---

# Database

Backend: **Neon Postgres**, accessed with **Drizzle ORM** (`drizzle-orm/postgres-js`). The schema is defined in `src/lib/db/schema.ts` and versioned as SQL in `drizzle/` (`0000_init.sql` plus `meta/`); use `npm run db:generate` / `db:migrate` (drizzle-kit). The data originally lived in Supabase; the one-off scripts `scripts/migrate-from-supabase.ts` and `scripts/apply-exported-data.ts` (`npm run migrate-from-supabase`) copied it over, and `SUPABASE_DB_URL` is needed only for that script.

## Tables (from `src/lib/db/schema.ts`)

- `church_settings` — singleton (`id = 1`) row: name, tagline, description, history, address, phone, email, pastor, etc. Powers most of the public site's copy.
- `services` — service times/details, ordered by `sort_order`.
- `leadership` — pastors/leaders shown on About/Leadership, ordered by `sort_order`.
- `statement_of_faith` — beliefs content, ordered by `sort_order`.
- `events` — upcoming and past events; flags like `is_past`, plus `start_datetime`/`end_datetime`, `flyer`, `video`, `link` for structured data and RSVP linking.
- `event_rsvps` — RSVP submissions tied to events (via `RsvpForm.tsx`).
- `devotionals` — daily devotional content, categorized (Adult/Youth/Children per `src/app/api/cron/sync-devotional`), unique on (`date`, `category`); the cron upserts on that pair.
- `ministries` — ministry listing + individual `[slug]` pages.
- `posts` — blog/announcement posts, listing + `[slug]` detail.
- `gallery_images` — photo gallery entries (admin-managed uploads).
- `messages` — contact form submissions (`src/lib/actions/public.ts`).
- `subscribers` — newsletter signups (`NewsletterForm.tsx`).
- `testimonies` — testimony submissions (`TestimonyForm.tsx`), moderated via admin.
- `admins` — admin accounts: `id`, unique `email`, bcrypt `password_hash`, `created_at`. Replaces Supabase Auth; rows were carried over from `auth.users` by the migration script. There is no signup flow in the app.

## Access pattern

All queries go through the server-side Drizzle `db` client (`src/lib/db/client.ts`); the browser never connects to the database (see [[Architecture]]). There is no row-level security: authorization is enforced in application code — every mutating admin Server Action calls `requireAdmin()` — see [[Security]].

## Notes

Column-level detail lives in `src/lib/db/schema.ts` and `drizzle/0000_init.sql`; this note lists tables only. Some `events` columns were added during the Supabase migration because the app already read/wrote them (see the comment in `schema.ts`).
