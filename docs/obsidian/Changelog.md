---
project: deeperlife-columbia
type: changelog
status: active
last_updated: 2026-10-07
tags: [project/deeperlife-columbia]
---

# Changelog

Reconstructed from `git log`. The repository's visible history currently contains a single commit — earlier history is not available in this clone (likely squashed or the repo was reinitialized).

- **7853c4a** — Fix Events structured data: valid ISO `startDate`, image, description, and offers fields in the Events JSON-LD, improving SEO/rich-result eligibility for event listings.

## This change

- Added an Obsidian-compatible documentation knowledge base under `docs/obsidian/` (this file included), plus the `obsidian-sync` skill and `/sync-docs` command for keeping it current. No application code changed.

- `/events` now hides the "Learn More" button and video player when an event has no link/video (needed for the Oct 22–25, 2026 Seniors' Retreat and Men's Conference, whose flyers live in `public/images/events/`).

- Seniors' Retreat 2026 and Men's Conference 2026 are now defined in `src/lib/featured-events.ts` and shown on `/events` and the home page regardless of the Neon `events` table (flyers in `public/images/events/`). Events JSON-LD now uses each event's venue and absolute flyer URLs; RSVP only stores a real UUID `event_id`.
- Home page now shows up to three upcoming events as cards (was one).
- Added `/prayer` and `/resources` pages (nav + sitemap), and a Global DCLM Programs section on `/events`.

## Related

[[Project]] · [[Decisions]]
