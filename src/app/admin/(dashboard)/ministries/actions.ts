"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/ministries");
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    image: String(formData.get("image") ?? "") || null,
    meeting_time: String(formData.get("meeting_time") ?? "") || null,
    cta_text: String(formData.get("cta_text") ?? "") || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createMinistry(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("ministries").insert(fields(formData));
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/ministries", "Ministry added");
}

export async function updateMinistry(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("ministries")
    .update(fields(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/ministries", "Ministry updated");
}

export async function deleteMinistry(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("ministries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/ministries", "Ministry deleted");
}
