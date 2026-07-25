"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

export async function markRead(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  await supabase.from("messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
  redirectWithToast("/admin/messages", "Message deleted");
}
