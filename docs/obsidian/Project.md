---
project: deeperlife-columbia
type: overview
status: active
last_updated: 2026-08-22
tags: [project/deeperlife-columbia]
---

# Deeper Life Columbia

## What it is

The public website and content-management backend for Deeper Life Bible Church Columbia. It is a marketing/informational church site (services, ministries, events, sermons, devotionals, beliefs, testimonies, giving links, gallery, contact/newsletter forms) paired with a password-protected admin dashboard the church staff use to edit that content without touching code.

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend/DB**: Supabase (Postgres + Auth + Storage), accessed via `@supabase/ssr` and `@supabase/supabase-js`
- **Motion/UX**: Framer Motion, Lenis (smooth scroll)
- **Hosting**: Vercel (see `vercel.json` — cron job configured there)
- **Analytics**: Google Analytics (`src/components/GoogleAnalytics.tsx`), Google Search Console verification file in `public/`

## Purpose

Give the church a professional public web presence and a simple internal tool for non-technical staff to keep site content (events, sermons, devotionals, leadership, testimonies, RSVPs, etc.) current, without needing a developer for routine updates.

## Structure at a glance

- `src/app/(site)/` — public marketing site (route group, shared layout/header/footer)
- `src/app/admin/` — authenticated CMS dashboard (route group `(dashboard)` behind Supabase Auth)
- `src/app/api/cron/sync-devotional/` — scheduled job that pulls daily devotional content from an external API
- `src/lib/supabase/` — Supabase client factories for browser/server/middleware contexts
- `src/lib/actions/` — public-facing Server Actions (contact form, etc.)
- `src/lib/data.ts` — server-side data-fetching helpers that query Supabase and shape it for the public pages
- `src/components/` — shared UI components (forms, hero, header/footer, scroll effects, admin widgets)

See [[Architecture]] for more detail on how the pieces fit together, [[Features]] for what's implemented, [[Database]] for the schema surface, and [[Security]] for the auth model.

## Scope notes

This is a content-driven site, not a transactional platform:
- No payments are processed in-app — `Give` is an outbound link to an external giving platform, so there is no `Payments.md`.
- There is a real backend and database (Supabase), so `Database.md`, `Backend.md`, and `Security.md` are included.
- No dedicated `Frontend.md` — the public site is straightforward Next.js page/component composition covered adequately by [[Architecture]] and [[Features]].
