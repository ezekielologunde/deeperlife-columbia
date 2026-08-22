---
project: deeperlife-columbia
type: features
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Features

## Public site (implemented)

- Home page with hero, service info, giving/event highlights
- About, Beliefs (Statement of Faith), Services, What to Expect, Salvation
- Ministries listing + individual ministry pages (`[slug]`)
- Sermons and Webcast pages
- Devotional: separate Adult/Youth/Children tracks, each with today's devotional, a `[date]` route, and an archive listing
- Events: upcoming/past listing with structured data (JSON-LD) for SEO, event detail with flyer/video/RSVP link, RSVP form
- Testimonies: public submission form + listing
- Gallery with lightbox
- Give (external link out — no in-app payment processing)
- Join Online, Serve, Posts/blog (`[slug]`)
- Contact form (with honeypot spam protection) and newsletter signup
- SEO: `robots.ts`, `sitemap.ts`, Google Search Console verification file, Google Analytics
- UX polish: page transitions, scroll progress bar, smooth scroll (Lenis), reveal/stagger animations (Framer Motion), skip link for accessibility, magnetic link hover effect, count-up numbers

## Admin CMS (implemented)

Password-protected dashboard (`/admin`, Supabase Auth) with CRUD screens for:
- Church info / settings
- Services, Leadership, Statement of Faith (Beliefs)
- Events (create/edit/delete, RSVP list per event)
- Devotional entries (manual add/edit, complements the automated cron sync)
- Ministries, Posts (with a rich `PostForm`)
- Gallery image uploads
- Testimonies (moderation)
- Messages (contact form submissions inbox)
- Subscribers (newsletter list)
- Account settings (password change)

## Automation

- Daily devotional sync via Vercel Cron (`/api/cron/sync-devotional`) pulling from an external DCLM API for Adult/Youth/Children categories, with failure notifications so staff can fill gaps manually.

## Not implemented / out of scope

- No in-app payment processing (Give is an outbound link) — see [[Project]] scope notes.
- No multi-role admin permissions — single tier of authenticated admin access.
- No public user accounts/login beyond the admin dashboard.

## Related

[[Project]] · [[Architecture]] · [[Tasks]]
