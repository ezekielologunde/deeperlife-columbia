import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { devotionals } from "@/lib/db/schema";

export const maxDuration = 60;

const DCLM_API_URL =
  "https://dailymanna-backend-jt33.onrender.com/api/devotionals/date";
const NTFY_TOPIC = process.env.NTFY_TOPIC;
const CATEGORIES = ["Adult", "Youth", "Children"] as const;

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

async function notifyFailure(reason: string, today: string, category: string) {
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
      body: `${category} devotional auto-sync failed for ${today}: ${reason}. Add it manually at /admin/devotional.`,
    });
  } catch {
    // Notification is best-effort — never let a failed alert mask the
    // original sync failure or throw inside the route.
  }
}

// The DCLM backend is on a host that cold-starts (Render), so the first
// request can be slow or fail. Each attempt gets its own timeout; transient
// failures are retried with backoff. Worst case per category is
// 3 * 15s + 2s + 4s = 51s, which fits maxDuration because categories run
// in parallel.
const FETCH_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 2_000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchDclm(today: string, category: string): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${DCLM_API_URL}/${today}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: today, category }),
        cache: "no-store",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      // Retry only transient statuses; other 4xx won't change on retry.
      const transient = res.status >= 500 || res.status === 429;
      if (!transient || attempt === MAX_ATTEMPTS) return res;
      lastError = new Error(`DCLM API returned ${res.status}`);
    } catch (err) {
      // Network error or timeout.
      lastError = err;
      if (attempt === MAX_ATTEMPTS) break;
    }
    await sleep(RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
  }
  const name = lastError instanceof Error ? lastError.name : "";
  throw new Error(
    name === "TimeoutError"
      ? `DCLM API timed out after ${MAX_ATTEMPTS} attempts`
      : `DCLM API unreachable after ${MAX_ATTEMPTS} attempts`,
  );
}

async function syncCategory(
  category: (typeof CATEGORIES)[number],
  today: string,
) {
  const res = await fetchDclm(today, category);

  if (!res.ok) {
    const reason = `DCLM API returned ${res.status}`;
    await notifyFailure(reason, today, category);
    return { category, status: "error", message: reason };
  }

  const json = await res.json();
  const d: DclmDevotional | undefined = json?.data?.devotional;

  if (!d?.topic || !d?.description) {
    const reason = "Unexpected DCLM API response shape";
    await notifyFailure(reason, today, category);
    return { category, status: "error", message: reason };
  }

  const values = {
    date: today,
    category,
    title: d.topic,
    key_verse: d.keyVerse,
    bible_reading: formatBibleReading(d),
    body: d.description,
    thought_of_day: d.thoughtOfTheDay ?? null,
    bible_in_one_year: d.bibleInOneYear ?? null,
    audio_url: d.audioUrl ?? null,
    source: "dclm_api",
  };

  try {
    await db
      .insert(devotionals)
      .values(values)
      .onConflictDoUpdate({
        target: [devotionals.date, devotionals.category],
        set: values,
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Database error";
    await notifyFailure(`Database error: ${message}`, today, category);
    return { category, status: "error", message };
  }

  return { category, status: "success" };
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

  const results = await Promise.all(
    CATEGORIES.map(async (category) => {
      try {
        return await syncCategory(category, today);
      } catch (err) {
        const reason = err instanceof Error ? err.message : "Unknown error";
        await notifyFailure(reason, today, category);
        return { category, status: "error", message: reason };
      }
    }),
  );

  return NextResponse.json({ date: today, results });
}
