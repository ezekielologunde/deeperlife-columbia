"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/leadership");
}

function fields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    title: String(formData.get("title") ?? ""),
    photo_url: String(formData.get("photo_url") ?? "") || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createLeader(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("leadership").insert(fields(formData));
  if (error) throw new Error(error.message);
  refresh();
}

export async function updateLeader(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("leadership")
    .update(fields(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteLeader(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("leadership").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
