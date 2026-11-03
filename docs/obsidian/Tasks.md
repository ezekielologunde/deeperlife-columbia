---
project: deeperlife-columbia
type: tasks
status: active
last_updated: 2026-11-03
tags: [project/deeperlife-columbia]
---

# Tasks

No `TODO`/`FIXME` comments were found in `src/`. Gaps below are inferred from auditing the codebase rather than lifted from inline comments.

## Documentation / verification gaps

- [ ] Confirm `CRON_SECRET` is set in Production: the cron route only checks it when set, so an unset value leaves the endpoint open — see [[Security]].
- [ ] Decide whether to drop the one-off Supabase migration scripts and `SUPABASE_DB_URL` once the migration is considered final — see [[Database]].
- [ ] Confirm rate limiting (or lack of it) on public form Server Actions (contact, newsletter, testimony, RSVP) beyond the honeypot field.

## Possible product gaps (not confirmed as planned work — flag for the team)

- [ ] No visible role separation in the admin dashboard (all valid admin sessions are full admins) — fine for a small team, worth flagging if the admin user list grows.
- [ ] No automated tests found in the repo (no `__tests__`, `*.test.ts(x)`, or test runner in `package.json`).

## Related

[[Features]] · [[Security]] · [[Database]]
