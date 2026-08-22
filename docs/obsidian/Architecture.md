---
project: deeperlife-columbia
type: architecture
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Architecture

See [[Project]] for the high-level summary.

## Route groups

- **`src/app/(site)/`** — the public website. Every page here is a server component that calls into `src/lib/data.ts` (or a page-local query) to read from Supabase and render HTML. Pages: home, about, beliefs, services, ministries (+ `[slug]`), sermons, webcast, devotional (adult/youth/children, each with `[date]` and `archive` routes), events, testimonies, gallery, give, join-online, salvation, serve, what-to-expect, contact, posts (+ `[slug]`).
- **`src/app/admin/`** — the CMS.
  - `admin/login/` — public login page + `actions.ts` (Server Action calling `supabase.auth.signInWithPassword`).
  - `admin/(dashboard)/` — everything behind auth: dashboard home, and one folder per content type (beliefs, church-info, devotional, events, gallery, leadership, messages, ministries, posts, rsvps, services, subscribers, testimonies, account). Each content folder follows the same pattern: `page.tsx` (list/table), `[id]/page.tsx` (edit form), `actions.ts` (Server Actions doing the Supabase read/write).
- **`src/app/api/cron/sync-devotional/`** — a Vercel Cron endpoint (see `vercel.json`, scheduled `0 10 * * *`) that fetches the day's devotional from an external DCLM API and upserts it into Supabase for Adult/Youth/Children categories, with a best-effort ntfy.sh push notification on failure.

## Auth gating

`src/proxy.ts` (Next.js middleware, renamed to "proxy" in this Next.js version) runs `updateSession()` from `src/lib/supabase/middleware.ts` on every non-static request. It refreshes the Supabase session and redirects unauthenticated users away from any `/admin/*` route (except `/admin/login`) to the login page. This is the entire authorization boundary for the CMS.

## Data flow

1. Public pages call server-side Supabase clients (`src/lib/supabase/server.ts`) directly in server components, or via helpers in `src/lib/data.ts`, to read published content (church settings, services, leadership, statement of faith, events, etc.).
2. Admin pages use the same server client (already authenticated via the session cookie) to read/write the same tables through Server Actions colocated as `actions.ts` next to each admin section.
3. Public-facing writes (contact form, newsletter signup, RSVP, testimony submission) go through Server Actions in `src/lib/actions/public.ts` and page-local actions, which insert rows into Supabase tables (e.g. `messages`) and optionally fire a best-effort ntfy.sh notification. A honeypot field (`HoneypotField.tsx`) provides lightweight bot filtering.

## Client vs server Supabase

- `src/lib/supabase/client.ts` — browser client (anon key), for client components that need it.
- `src/lib/supabase/server.ts` — server client bound to the request's cookies, used in server components and Server Actions.
- `src/lib/supabase/middleware.ts` — the middleware-specific client used by `src/proxy.ts` to refresh sessions and enforce the admin auth gate.

## Related

[[Database]] · [[Backend]] · [[Security]] · [[Features]]
