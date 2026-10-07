import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  unique,
} from "drizzle-orm/pg-core";

// Column keys intentionally match the original Supabase/Postgres column
// names (snake_case) rather than idiomatic Drizzle camelCase, so every
// existing `row.event_date`, `row.is_past`, etc. access across the app
// keeps working unchanged after the query-layer swap.

export const churchSettings = pgTable("church_settings", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull().default(""),
  tagline: text("tagline").notNull().default(""),
  description: jsonb("description").notNull().default([]),
  history: text("history").notNull().default(""),
  address: jsonb("address").notNull().default({}),
  phone: text("phone").notNull().default(""),
  phone_display: text("phone_display").notNull().default(""),
  email: text("email").notNull().default(""),
  pastor: text("pastor").notNull().default(""),
  pastor_photo: text("pastor_photo").notNull().default(""),
  pastor_and_wife_photo: text("pastor_and_wife_photo").notNull().default(""),
  zoom: jsonb("zoom").notNull().default({}),
  giving: jsonb("giving").notNull().default({}),
  social: jsonb("social").notNull().default({}),
  international_site: jsonb("international_site").notNull().default({}),
  regional_site: jsonb("regional_site").notNull().default({}),
  app: jsonb("app").notNull().default({}),
  webcast: jsonb("webcast").notNull().default({}),
  youtube_uploads_playlist_id: text("youtube_uploads_playlist_id")
    .notNull()
    .default(""),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  time: text("time").notNull(),
  mode: text("mode").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const ministries = pgTable("ministries", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  meeting_time: text("meeting_time"),
  cta_text: text("cta_text"),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  slug: text("slug").notNull().unique(),
  details: text("details"),
});

export const leadership = pgTable("leadership", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  photo_url: text("photo_url"),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const statementOfFaith = pgTable("statement_of_faith", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  event_date: text("event_date"),
  event_time: text("event_time"),
  // Added during the Supabase migration: the app has read/written these
  // since commit 7853c4a (Events structured data), but the column never
  // actually existed on the live Supabase table, so saving start/end
  // date-time on an event has been silently broken in production. Fixed
  // here rather than replicated.
  start_datetime: timestamp("start_datetime", { withTimezone: true, mode: "string" }),
  end_datetime: timestamp("end_datetime", { withTimezone: true, mode: "string" }),
  verse: text("verse"),
  host: text("host"),
  venue: text("venue"),
  description: text("description"),
  flyer: text("flyer"),
  video: text("video"),
  link: text("link"),
  phone: text("phone"),
  email: text("email"),
  is_past: boolean("is_past").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body").notNull().default(""),
  cover_image: text("cover_image"),
  published: boolean("published").notNull().default(false),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  author: text("author"),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category").notNull().default("general"),
  body: text("body").notNull(),
  is_read: boolean("is_read").notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const eventRsvps = pgTable("event_rsvps", {
  id: uuid("id").primaryKey().defaultRandom(),
  event_id: uuid("event_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  event_title: text("event_title").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  guests: integer("guests").notNull().default(1),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const testimonies = pgTable("testimonies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  caption: text("caption"),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});

export const devotionals = pgTable(
  "devotionals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    date: date("date", { mode: "string" }).notNull(),
    title: text("title").notNull(),
    key_verse: text("key_verse").notNull(),
    bible_reading: text("bible_reading"),
    body: text("body").notNull(),
    thought_of_day: text("thought_of_day"),
    bible_in_one_year: text("bible_in_one_year"),
    audio_url: text("audio_url"),
    source: text("source").notNull().default("dclm_api"),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    category: text("category").notNull().default("Adult"),
  },
  (table) => [
    unique("devotionals_date_category_key").on(table.date, table.category),
  ],
);

// New: replaces Supabase Auth. Single-admin-tier model carries over exactly
// — any row in this table is a full admin, matching the pre-migration
// "any authenticated user is a full admin" trust model.
export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});
