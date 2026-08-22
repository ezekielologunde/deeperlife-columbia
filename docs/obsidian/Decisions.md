---
project: deeperlife-columbia
type: decisions
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Decisions

Notable choices visible in the code, with brief rationale where inferable.

- **Supabase over a custom backend** — gets Postgres, Auth, and Storage in one managed service, avoiding a separate API layer for what is fundamentally a CMS-backed marketing site. See [[Backend]] / [[Database]].
- **Server Actions instead of REST/API routes for CRUD** — every admin mutation and public form submission is a Next.js Server Action colocated with its page (`actions.ts` per section), rather than a generic `/api/*` CRUD layer. Keeps data access close to the UI that uses it; the one real API route (`/api/cron/sync-devotional`) exists only because it needs to be triggered externally by Vercel Cron.
- **Give is an external link, not an in-app payment flow** — avoids PCI/compliance overhead of handling donations directly; church presumably uses an existing giving platform.
- **Honeypot over CAPTCHA for spam mitigation** — a hidden form field (`HoneypotField.tsx`) trades some spam-catching power for zero friction on real users and no third-party CAPTCHA dependency.
- **Best-effort ntfy.sh notifications, never blocking** — both the contact-form notifier and the devotional-sync failure notifier are wrapped so a notification failure can never mask or block the underlying operation (explicit code comments confirm this is intentional).
- **Single admin tier, no roles** — simplest model for a small church staff team; anyone with a Supabase Auth account gets full CMS access.
- **Automated devotional sync with manual fallback** — the cron job fetches from a third-party DCLM API daily, but failures notify staff to add content manually via `/admin/devotional`, rather than leaving devotional pages empty.
- **`proxy.ts` as the middleware file name** — this Next.js version renames middleware to "proxy" (per `AGENTS.md`'s warning that this Next.js release has breaking API/convention changes from prior versions).

## Related

[[Architecture]] · [[Backend]] · [[Security]]
