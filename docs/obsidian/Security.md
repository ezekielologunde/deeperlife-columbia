---
project: deeperlife-columbia
type: security
status: active
last_updated: 2026-11-03
tags: [project/deeperlife-columbia]
---

# Security

## Auth model

- App-owned email/password auth protects the `/admin` route group. `login` (`src/app/admin/login/actions.ts`) looks up the `admins` row, verifies the bcrypt hash (`src/lib/auth/password.ts`), and sets an `admin_session` cookie holding an HS256 JWT (`jose`, signed with `SESSION_SECRET`, 30-day expiry; `src/lib/auth/session.ts`). `logout` deletes the cookie.
- `src/proxy.ts` verifies that cookie for `/admin/*` and redirects unauthenticated requests to `/admin/login`. This is a page-level convenience, **not** the security boundary.
- The real boundary is `requireAdmin()` (`src/lib/auth/require-admin.ts`), called at the top of mutating Server Actions, because Server Functions can be invoked directly without the page. Every `actions.ts` under `src/app/admin/(dashboard)/*` imports it; the image-upload action (`src/lib/actions/admin-upload.ts`) does too.
- No role/permission tiers — any valid admin session is a full admin. There is no signup flow; `admins` rows came from the Supabase migration script or are inserted directly into the database.
- Sessions are stateless JWTs: there is no server-side revocation, so a leaked cookie stays valid until it expires (30 days) or `SESSION_SECRET` is rotated (which signs everyone out). Not verified against any revocation logic — none exists in `src/lib/auth/`.

## Row-level security

None. The database is Neon Postgres reached only from the server with a single connection string, so there are no per-user database roles or RLS policies; all authorization lives in application code (`requireAdmin()`). Any new Server Action that writes must call it explicitly — nothing enforces that automatically.

## Bot/spam mitigation

- Honeypot field (`src/components/HoneypotField.tsx`) on public forms (contact, likely newsletter/testimony/RSVP too) — a hidden `website` field that real users never fill; any non-empty value on submit is treated as a bot and silently no-ops (returns success without writing).
- No CAPTCHA, no rate limiting visible in the Server Actions.

## Secrets / env vars

Listed in `.env.example` (real values are not committed):
- `DATABASE_URL` — Neon pooled Postgres connection string.
- `SESSION_SECRET` — signs the admin session JWT; should differ between Preview and Production.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token for admin image uploads.
- `CRON_SECRET` — the cron route (`/api/cron/sync-devotional`) checks `Authorization: Bearer <CRON_SECRET>`, but **only when the variable is set**; if it is unset the endpoint is open to anyone.
- `NTFY_TOPIC` — push notification topic, optional, best-effort only, never blocks core flows.
- `SUPABASE_DB_URL` — used only by the one-off `migrate-from-supabase` script, not by the running app.

## Known gaps

- `CRON_SECRET` is optional in code: unset means the cron route is unauthenticated (it can only trigger a re-sync, but it also fires outbound calls). Confirm it is set in Production.
- No server-side session revocation (see Auth model).
- `requireAdmin()` is a manual convention per action, not enforced centrally.
- No dependency/security audit tooling configured beyond default `eslint`.

## Related

[[Architecture]] · [[Backend]] · [[Database]]
