---
project: deeperlife-columbia
type: database
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Database

Backend: **Supabase** (managed Postgres + Auth). There is no `supabase/migrations` directory or SQL checked into this repo — the schema exists only in the live Supabase project, inferred here from the tables the app code queries (`.from("...")` calls across `src/lib/data.ts` and `src/app/admin/**/actions.ts`).

## Tables referenced in code

- `church_settings` — singleton (`id = 1`) row: name, tagline, description, history, address, phone, email, pastor, etc. Powers most of the public site's copy.
- `services` — service times/details, ordered by `sort_order`.
- `leadership` — pastors/leaders shown on About/Leadership, ordered by `sort_order`.
- `statement_of_faith` — beliefs content, ordered by `sort_order`.
- `events` — upcoming and past events; flags like `is_past`, plus `start_datetime`/`end_datetime`, `flyer`, `video`, `link` for structured data and RSVP linking.
- `event_rsvps` — RSVP submissions tied to events (via `RsvpForm.tsx`).
- `devotionals` — daily devotional content, categorized (Adult/Youth/Children per `src/app/api/cron/sync-devotional`), keyed by date.
- `ministries` — ministry listing + individual `[slug]` pages.
- `posts` — blog/announcement posts, listing + `[slug]` detail.
- `gallery_images` — photo gallery entries (admin-managed uploads).
- `messages` — contact form submissions (`src/lib/actions/public.ts`).
- `subscribers` — newsletter signups (`NewsletterForm.tsx`).
- `testimonies` — testimony submissions (`TestimonyForm.tsx`), moderated via admin.

## Access pattern

No ORM — every query is a direct `@supabase/supabase-js` call (`supabase.from(table).select/insert/update/delete`) using either the anon-key browser client, the cookie-bound server client, or the middleware client (see [[Architecture]]). Row-level security policies are presumed to gate writes (admin routes require an authenticated session), but the policies themselves are not present in this repo and were not verified here — see [[Security]] and [[Tasks]].

## Gap

Schema/migrations are not version-controlled in this repo. If migrations are ever added (e.g. via `supabase/migrations/`), this file should be updated to reflect actual column definitions, foreign keys, and RLS policies rather than inferred table/field names.
