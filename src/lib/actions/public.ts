"use server";

import { createClient } from "@/lib/supabase/server";

export type FormState = { success: boolean; error?: string };

// Honeypot: a field named "website" that's hidden from real visitors via
// CSS. Bots that auto-fill every input trip it; humans never see it.
function isBot(formData: FormData) {
  return String(formData.get("website") ?? "").trim().length > 0;
}

export async function submitMessage(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) return { success: true };

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
  if (isBot(formData)) return { success: true };

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

export async function submitTestimony(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) return { success: true };

  const name = String(formData.get("name") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!name || !content) {
    return { success: false, error: "Please share your name and testimony." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonies").insert({
    name,
    content,
  });

  if (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitRsvp(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) return { success: true };

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
