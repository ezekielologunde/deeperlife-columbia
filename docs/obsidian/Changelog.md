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

- Added Seniors' Retreat 2026 and Men's Conference 2026 (Oct 22–25) to the `events` table with flyers in `public/images/`. `/events` now hides the "Learn More" button and video player when an event has no link/video.

## Related

[[Project]] · [[Decisions]]
