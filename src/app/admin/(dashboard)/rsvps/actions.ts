"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteRsvp(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  await supabase.from("event_rsvps").delete().eq("id", id);
  revalidatePath("/admin/rsvps");
}
