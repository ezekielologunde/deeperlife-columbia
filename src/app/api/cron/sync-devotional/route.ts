import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const DCLM_API_URL =
  "https://dailymanna-backend-jt33.onrender.com/api/devotionals/date";
const CRON_HEADER_SECRET = process.env.CRON_SECRET ?? "";
const NTFY_TOPIC = process.env.NTFY_TOPIC;

type DclmDevotional = {
  date: string;
  topic: string;
  keyVerse: string;
  book?: string;
  chapter?: string;
  verse?: string;
  description: string;
  thoughtOfTheDay?: string;
  bibleInOneYear?: string;
  audioUrl?: string | null;
};

function formatBibleReading(d: DclmDevotional) {
  if (!d.book || !d.chapter) return null;
  return `${d.book} ${d.chapter}${d.verse ? `:${d.verse}` : ""}`;
}

async function notifyFailure(reason: string, today: string) {
  if (!NTFY_TOPIC) return;
  try {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Title: "Devotional sync failed",
        Priority: "high",
        Tags: "warning",
      },
      body: `Daily devotional auto-sync failed for ${today}: ${reason}. Add it manually at /admin/devotional.`,
    });
  } catch {
    // Notification is best-effort — never let a failed alert mask the
    // original sync failure or throw inside the route.
  }
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    auth !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  try {
    const res = await fetch(`${DCLM_API_URL}/${today}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today, category: "Adult" }),
      cache: "no-store",
    });

    if (!res.ok) {
      const reason = `DCLM API returned ${res.status}`;
      await notifyFailure(reason, today);
      return NextResponse.json({ status: "error", message: reason }, { status: 200 });
    }

    const json = await res.json();
    const d: DclmDevotional | undefined = json?.data?.devotional;

    if (!d?.topic || !d?.description) {
      const reason = "Unexpected DCLM API response shape";
      await notifyFailure(reason, today);
      return NextResponse.json({ status: "error", message: reason }, { status: 200 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { "x-cron-secret": CRON_HEADER_SECRET } } },
    );

    const { error } = await supabase.from("devotionals").upsert(
      {
        date: today,
        title: d.topic,
        key_verse: d.keyVerse,
        bible_reading: formatBibleReading(d),
        body: d.description,
        thought_of_day: d.thoughtOfTheDay ?? null,
        bible_in_one_year: d.bibleInOneYear ?? null,
        audio_url: d.audioUrl ?? null,
        source: "dclm_api",
      },
      { onConflict: "date" },
    );

    if (error) {
      await notifyFailure(`Database error: ${error.message}`, today);
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 200 },
      );
    }

    return NextResponse.json({ status: "success", date: today });
  } catch (err) {
    const reason = err instanceof Error ? err.message : "Unknown error";
    await notifyFailure(reason, today);
    return NextResponse.json({ status: "error", message: reason }, { status: 200 });
  }
}
