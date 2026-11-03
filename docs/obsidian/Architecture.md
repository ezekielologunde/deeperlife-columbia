---
project: deeperlife-columbia
type: architecture
status: active
last_updated: 2026-11-03
tags: [project/deeperlife-columbia]
---

# Architecture

See [[Project]] for the high-level summary.

## Route groups

- **`src/app/(site)/`** — the public website. Every page here is a server component that calls into `src/lib/data.ts` (or a page-local query) to read from Neon Postgres (via Drizzle) and render HTML. Pages: home, about, beliefs, services, ministries (+ `[slug]`), sermons, webcast, devotional (adult/youth/children, each with `[date]` and `archive` routes), events, testimonies, gallery, give, join-online, salvation, serve, what-to-expect, contact, posts (+ `[slug]`).
- **`src/app/admin/`** — the CMS.
  - `admin/login/` — public login page + `actions.ts` (Server Action that checks the password against the `admins` table and sets a signed session cookie — see [[Backend]]).
  - `admin/(dashboard)/` — everything behind auth: dashboard home, and one folder per content type (beliefs, church-info, devotional, events, gallery, leadership, messages, ministries, posts, rsvps, services, subscribers, testimonies, account). Each content folder follows the same pattern: `page.tsx` (list/table), `[id]/page.tsx` (edit form), `actions.ts` (Server Actions doing the Drizzle read/write, each starting with `requireAdmin()`).
- **`src/app/api/cron/sync-devotional/`** — a Vercel Cron endpoint (see `vercel.json`, scheduled `0 10 * * *`) that fetches the day's devotional from an external DCLM API and upserts it into the `devotionals` table for Adult/Youth/Children categories, with a best-effort ntfy.sh push notification on failure.

## Auth gating

`src/proxy.ts` (Next.js middleware, renamed to "proxy" in this Next.js version) runs on non-static requests. For `/admin/*` it verifies the `admin_session` JWT cookie (`verifySession` in `src/lib/auth/session.ts`): unauthenticated requests are redirected to `/admin/login`, and an already-signed-in user hitting the login page is redirected to `/admin`. This is a UX convenience, not the security boundary: each mutating Server Action calls `requireAdmin()` (`src/lib/auth/require-admin.ts`) itself, because Server Functions can be invoked without going through the page. See [[Security]].

## Data flow

1. Public pages query the database through the Drizzle `db` client (`src/lib/db/client.ts`) directly in server components, or via helpers in `src/lib/data.ts`, to read published content (church settings, services, leadership, statement of faith, events, etc.).
2. Admin pages use the same `db` client to read/write the same tables through Server Actions colocated as `actions.ts` next to each admin section.
3. Public-facing writes (contact form, newsletter signup, RSVP, testimony submission) go through Server Actions in `src/lib/actions/public.ts` and page-local actions, which insert rows into tables (e.g. `messages`) and optionally fire a best-effort ntfy.sh notification. A honeypot field (`HoneypotField.tsx`) provides lightweight bot filtering.

## Data access

- `src/lib/db/client.ts` — single server-only `postgres-js` + Drizzle client, pointed at Neon's pooled connection string (`DATABASE_URL`, `prepare: false`). There is no browser database client; the browser never talks to the database directly.
- `src/lib/db/schema.ts` — Drizzle schema, source of truth for tables. See [[Database]].
- Image uploads go through the `uploadAdminImage` Server Action (`src/lib/actions/admin-upload.ts`) to Vercel Blob.

## Related

[[Database]] · [[Backend]] · [[Security]] · [[Features]]
