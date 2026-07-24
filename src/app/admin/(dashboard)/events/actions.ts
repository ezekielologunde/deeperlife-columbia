"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/events");
}

function opt(formData: FormData, key: string) {
  return String(formData.get(key) ?? "") || null;
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    subtitle: opt(formData, "subtitle"),
    event_date: opt(formData, "event_date"),
    event_time: opt(formData, "event_time"),
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
  const supabase = await createClient();
  const { error } = await supabase.from("events").insert(fields(formData));
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/events", "Event added");
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("events")
    .update(fields(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/events", "Event updated");
}

export async function deleteEvent(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/events", "Event deleted");
}
