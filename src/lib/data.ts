import { createClient } from "@/lib/supabase/server";

type EventRow = {
  id: string;
  title: string;
  subtitle: string | null;
  event_date: string | null;
  event_time: string | null;
  verse: string | null;
  host: string | null;
  venue: string | null;
  description: string | null;
  flyer: string | null;
  video: string | null;
  link: string | null;
  phone: string | null;
  email: string | null;
  is_past: boolean;
};

export async function getChurchData() {
  const supabase = await createClient();
  const [settingsRes, servicesRes, leadershipRes, faithRes, eventsRes] =
    await Promise.all([
      supabase.from("church_settings").select("*").eq("id", 1).single(),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("leadership").select("*").order("sort_order"),
      supabase.from("statement_of_faith").select("*").order("sort_order"),
      supabase.from("events").select("*").order("sort_order"),
    ]);

  const s = settingsRes.data;
  const events = (eventsRes.data ?? []) as EventRow[];

  const upcomingEvents = events
    .filter((e) => !e.is_past)
    .map((e) => ({
      id: e.id,
      title: e.title,
      subtitle: e.subtitle ?? "",
      date: e.event_date ?? "",
      time: e.event_time ?? "",
      verse: e.verse ?? "",
      host: e.host ?? "",
      flyer: e.flyer ?? "",
      video: e.video ?? "",
      link: e.link ?? "",
    }));

  const pastEvents = events
    .filter((e) => e.is_past)
    .map((e) => ({
      title: e.title,
      date: e.event_date ?? "",
      venue: e.venue ?? "",
      verse: e.verse ?? "",
      description: e.description ?? "",
      phone: e.phone ?? "",
      email: e.email ?? "",
      link: e.link ?? "",
    }));

  return {
    name: s?.name ?? "Deeper Life Bible Church Columbia",
    tagline: s?.tagline ?? "",
    description: (s?.description as string[] | undefined) ?? [],
    history: s?.history ?? "",
    address: (s?.address as { line1: string; line2: string; line3: string } | undefined) ?? {
      line1: "",
      line2: "",
      line3: "",
    },
    phone: s?.phone ?? "",
    phoneDisplay: s?.phone_display ?? "",
    email: s?.email ?? "",
    pastor: s?.pastor ?? "",
    pastorPhoto: s?.pastor_photo ?? "",
    pastorAndWifePhoto: s?.pastor_and_wife_photo ?? "",
    leadership: (leadershipRes.data ?? []).map((l) => ({
      name: l.name as string,
      title: l.title as string,
      photoUrl: (l.photo_url as string | null) ?? undefined,
    })),
    statementOfFaith: (faithRes.data ?? []).map((f) => ({
      title: f.title as string,
      text: f.text as string,
    })),
    services: (servicesRes.data ?? []).map((sv) => ({
      name: sv.name as string,
      time: sv.time as string,
      mode: sv.mode as string,
    })),
    zoom: (s?.zoom as { link: string; meetingId: string; passcode: string } | undefined) ?? {
      link: "",
      meetingId: "",
      passcode: "",
    },
    giving: (s?.giving as { zelleId: string } | undefined) ?? { zelleId: "" },
    upcomingEvents,
    pastEvents,
    social: (s?.social as { facebook: string; instagram: string; youtube: string } | undefined) ?? {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    youtubeUploadsPlaylistId: s?.youtube_uploads_playlist_id ?? "",
    internationalSite: (s?.international_site as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
    regionalSite: (s?.regional_site as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
    app: (s?.app as { label: string; url: string } | undefined) ?? { label: "", url: "" },
    webcast: (s?.webcast as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
  };
}

export type ChurchData = Awaited<ReturnType<typeof getChurchData>>;

export async function getMinistriesData() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ministries")
    .select("*")
    .order("sort_order");

  return (data ?? []).map((m) => ({
    slug: m.slug as string,
    title: m.title as string,
    desc: m.description as string,
    details: (m.details as string | null) ?? undefined,
    image: (m.image as string | null) ?? undefined,
    meetingTime: (m.meeting_time as string | null) ?? undefined,
    ctaText: (m.cta_text as string | null) ?? undefined,
  }));
}

export async function getMinistryBySlug(slug: string) {
  const ministries = await getMinistriesData();
  return ministries.find((m) => m.slug === slug) ?? null;
}

export async function getTestimonies() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonies")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .order("created_at", { ascending: false });

  return (data ?? []).map((t) => ({
    id: t.id as string,
    name: t.name as string,
    content: t.content as string,
  }));
}

export async function getGalleryImages() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");

  return (data ?? []).map((g) => ({
    id: g.id as string,
    url: g.url as string,
    caption: (g.caption as string | null) ?? undefined,
  }));
}

function mapDevotional(d: Record<string, unknown>) {
  return {
    date: d.date as string,
    title: d.title as string,
    keyVerse: d.key_verse as string,
    bibleReading: (d.bible_reading as string | null) ?? undefined,
    body: d.body as string,
    thoughtOfDay: (d.thought_of_day as string | null) ?? undefined,
    bibleInOneYear: (d.bible_in_one_year as string | null) ?? undefined,
    audioUrl: (d.audio_url as string | null) ?? undefined,
    source: d.source as string,
  };
}

export type Devotional = ReturnType<typeof mapDevotional>;

export async function getTodayDevotional() {
  const supabase = await createClient();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  const { data: exact } = await supabase
    .from("devotionals")
    .select("*")
    .eq("date", today)
    .maybeSingle();

  if (exact) return { devotional: mapDevotional(exact), isToday: true };

  const { data: latest } = await supabase
    .from("devotionals")
    .select("*")
    .lte("date", today)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  return latest ? { devotional: mapDevotional(latest), isToday: false } : null;
}

export async function getDevotionalByDate(date: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("devotionals")
    .select("*")
    .eq("date", date)
    .maybeSingle();

  return data ? mapDevotional(data) : null;
}

export async function getDevotionalArchive() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("devotionals")
    .select("date, title, key_verse")
    .order("date", { ascending: false });

  return (data ?? []).map((d) => ({
    date: d.date as string,
    title: d.title as string,
    keyVerse: d.key_verse as string,
  }));
}
