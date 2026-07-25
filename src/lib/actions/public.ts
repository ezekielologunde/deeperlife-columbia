"use server";

import { createClient } from "@/lib/supabase/server";

export type FormState = { success: boolean; error?: string };

export async function submitMessage(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const category = String(formData.get("category") ?? "general");
  const body = String(formData.get("body") ?? "").trim();

  if (!name || !email || !body) {
    return { success: false, error: "Please fill in your name, email, and message." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    name,
    email,
    phone: phone || null,
    category,
    body,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitSubscriber(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: true };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitRsvp(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const guests = Number(formData.get("guests") ?? 1);
  const eventId = String(formData.get("event_id") ?? "");
  const eventTitle = String(formData.get("event_title") ?? "");

  if (!name || !email || !eventTitle) {
    return { success: false, error: "Please fill in your name and email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("event_rsvps").insert({
    event_id: eventId || null,
    event_title: eventTitle,
    name,
    email,
    phone: phone || null,
    guests: Number.isFinite(guests) && guests > 0 ? guests : 1,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
