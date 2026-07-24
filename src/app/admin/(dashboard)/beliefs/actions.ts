"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/beliefs");
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    text: String(formData.get("text") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createBelief(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("statement_of_faith")
    .insert(fields(formData));
  if (error) throw new Error(error.message);
  refresh();
}

export async function updateBelief(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("statement_of_faith")
    .update(fields(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteBelief(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("statement_of_faith")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
