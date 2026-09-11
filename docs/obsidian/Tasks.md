---
project: deeperlife-columbia
type: tasks
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Tasks

No `TODO`/`FIXME` comments were found in `src/`. Gaps below are inferred from auditing the codebase rather than lifted from inline comments.

## Documentation / verification gaps

- [ ] Confirm whether `/api/cron/sync-devotional` actually validates `CRON_SECRET` against the incoming request (the env var is defined but its check wasn't confirmed in this audit) — see [[Security]].
- [ ] Document actual Supabase RLS policies once accessible; this repo has no `supabase/migrations/` to source them from — see [[Database]].
- [ ] Confirm rate limiting (or lack of it) on public form Server Actions (contact, newsletter, testimony, RSVP) beyond the honeypot field.

## Possible product gaps (not confirmed as planned work — flag for the team)

- [ ] No visible role separation in the admin dashboard (all authenticated users are full admins) — fine for a small team, worth flagging if the admin user list grows.
- [ ] No automated tests found in the repo (no `__tests__`, `*.test.ts(x)`, or test runner in `package.json`).

## Related

[[Features]] · [[Security]] · [[Database]]
