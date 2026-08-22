---
project: deeperlife-columbia
type: backend
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Backend

There is no separate backend service — "backend" here means Next.js Server Actions, one API route, and Supabase as the data/auth layer. See [[Database]] for tables and [[Security]] for auth.

## Server Actions

Colocated `actions.ts` files, one per feature area, all marked `"use server"`:

- **Public-facing**: `src/lib/actions/public.ts` (contact form `submitMessage`, honeypot bot check, best-effort ntfy.sh notification), plus page-local actions for newsletter signup, RSVP, and testimony submission.
- **Admin CMS**: one `actions.ts` per section under `src/app/admin/(dashboard)/*` (account, beliefs, church-info, devotional, events, gallery, leadership, messages, ministries, posts, rsvps, services, subscribers, testimonies) — standard CRUD against the matching Supabase table.
- **Auth**: `src/app/admin/login/actions.ts` (`login`, via `supabase.auth.signInWithPassword`) and `src/app/admin/(dashboard)/actions.ts` (`logout`, via `supabase.auth.signOut`).

## API routes

- `src/app/api/cron/sync-devotional/route.ts` — the only HTTP API route in the app. Triggered by Vercel Cron (`vercel.json`, daily at 10:00 UTC). For each category (Adult, Youth, Children) it POSTs to an external DCLM devotional API (`dailymanna-backend-jt33.onrender.com`), formats the response, and upserts it into the `devotionals` table. On failure it sends a best-effort push notification via ntfy.sh telling staff to add the devotional manually, and never lets that notification failure mask the sync failure.

## External integrations

- **DCLM devotional API** (third-party, unauthenticated by us but presumably guarded by `CRON_SECRET` on the cron trigger side) — daily devotional content source.
- **ntfy.sh** — lightweight push notifications for form submissions and sync failures (`NTFY_TOPIC` env var; entirely best-effort/non-blocking by design).
- **Google Analytics** — client-side only, via `GoogleAnalytics.tsx`.

## Related

[[Architecture]] · [[Database]] · [[Security]]
