"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { events } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/events");
}

function opt(formData: FormData, key: string) {
  return String(formData.get(key) ?? "") || null;
}

// datetime-local inputs give "YYYY-MM-DDTHH:mm" with no timezone info.
// Staff mean America/New_York (the church's local time) when they type a
// service time — this converts that wall-clock time to a correct UTC
// instant, accounting for EST/EDT, without pulling in a date library.
function easternWallClockToISOString(raw: string): string | null {
  const [datePart, timePart] = raw.split("T");
  if (!datePart || !timePart) return null;
  const [y, mo, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  if ([y, mo, d, h, mi].some((n) => Number.isNaN(n))) return null;

  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(new Date(guess)).map((p) => [p.type, p.value]),
  );
  const shownAsUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
  );
  const offset = guess - shownAsUTC;
  return new Date(guess + offset).toISOString();
}

function optDatetime(formData: FormData, key: string) {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) return null;
  return easternWallClockToISOString(raw);
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    subtitle: opt(formData, "subtitle"),
    event_date: opt(formData, "event_date"),
    event_time: opt(formData, "event_time"),
    start_datetime: optDatetime(formData, "start_datetime"),
    end_datetime: optDatetime(formData, "end_datetime"),
    verse: opt(formData, "verse"),
    host: opt(formData, "host"),
    venue: opt(formData, "venue"),
    description: opt(formData, "description"),
    flyer: opt(formData, "flyer"),
    video: opt(formData, "video"),
    link: opt(formData, "link"),
    phone: opt(formData, "phone"),
    email: opt(formData, "email"),
    is_past: formData.get("is_past") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createEvent(formData: FormData) {
  await requireAdmin();
  await db.insert(events).values(fields(formData));
  refresh();
  redirectWithToast("/admin/events", "Event added");
}

export async function updateEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.update(events).set(fields(formData)).where(eq(events.id, id));
  refresh();
  redirectWithToast("/admin/events", "Event updated");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(events).where(eq(events.id, id));
  refresh();
  redirectWithToast("/admin/events", "Event deleted");
}
