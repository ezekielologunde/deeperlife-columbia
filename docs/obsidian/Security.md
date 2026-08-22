---
project: deeperlife-columbia
type: security
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Security

## Auth model

- Supabase Auth (email/password) protects the entire `/admin` route group.
- `src/proxy.ts` runs Next.js middleware (`updateSession` in `src/lib/supabase/middleware.ts`) on every non-static request: refreshes the Supabase session cookie, and redirects any unauthenticated request to `/admin/*` (other than `/admin/login`) to the login page.
- No visible role/permission tiers — any authenticated Supabase user is treated as a full admin. There is no signup flow in the app; admin accounts are presumably provisioned directly in Supabase.

## Row-level security

Not verifiable from this repo — no SQL/migrations are checked in (see [[Database]]). It is assumed Supabase RLS policies gate table writes, since the browser/anon client is used in some contexts, but this has not been confirmed against actual policy definitions.

## Bot/spam mitigation

- Honeypot field (`src/components/HoneypotField.tsx`) on public forms (contact, likely newsletter/testimony/RSVP too) — a hidden `website` field that real users never fill; any non-empty value on submit is treated as a bot and silently no-ops (returns success without writing).
- No CAPTCHA, no rate limiting visible in the Server Actions.

## Secrets / env vars

Referenced in code but not committed (no `.env` or `.env.example` found in the repo):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase client config.
- `CRON_SECRET` — presumably validates the Vercel Cron trigger hitting `/api/cron/sync-devotional` (defined but the route handler itself wasn't confirmed to check it — worth verifying, see [[Tasks]]).
- `NTFY_TOPIC` — push notification topic, best-effort only, never blocks core flows.

## Known gaps

- RLS policies not documented/version-controlled.
- Whether `CRON_SECRET` is actually validated inside the cron route handler should be double-checked.
- No dependency/security audit tooling configured beyond default `eslint`.

## Related

[[Architecture]] · [[Backend]] · [[Database]]
