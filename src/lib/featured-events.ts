// Events that ship with the code so they appear on the site even when the
// `events` table has no matching row. A database event with the same title
// (case-insensitive) takes precedence, so adding one in /admin/events
// overrides the entry here; remove an entry once it lives in the database.

export type FeaturedEvent = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  verse: string;
  host: string;
  venue: string;
  flyer: string;
  video: string;
  link: string;
  startDatetime: string;
  endDatetime: string;
};

export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "featured-seniors-retreat-2026",
    title: "Seniors' Retreat 2026",
    subtitle: "Theme: Pilgrims' Progress",
    date: "October 22 – 25, 2026",
    time: "Thu 5–6:30 PM · Fri & Sat 8 AM–6 PM · Sun 8 AM–12 PM",
    verse: "",
    host: "Pastor Michael Dada (Regional Overseer)",
    venue:
      "Deeper Life Bible Church, 2000 Dr. Martin Luther King Jr. Blvd, Kinston, NC 28501",
    flyer: "/images/events/seniors-retreat-2026.jpg",
    video: "",
    link: "",
    startDatetime: "2026-10-22T21:00:00Z",
    endDatetime: "2026-10-25T16:00:00Z",
  },
  {
    id: "featured-mens-conference-2026",
    title: "Men's Conference 2026",
    subtitle: "Theme: Valiant Men — Rising to the Call",
    date: "October 22 – 25, 2026",
    time: "",
    verse: "",
    host: "",
    venue:
      "DLBC Convention Center, 2000 Dr. Martin Luther King Jr. Blvd, Kinston, NC 28501",
    flyer: "/images/events/mens-conference-2026.jpg",
    video: "",
    link: "",
    startDatetime: "2026-10-22",
    endDatetime: "2026-10-25",
  },
];
