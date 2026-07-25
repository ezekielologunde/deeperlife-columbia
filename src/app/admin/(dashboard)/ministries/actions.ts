"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh(slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/admin/ministries");
  revalidatePath("/ministries");
  if (slug) revalidatePath(`/ministries/${slug}`);
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fields(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  return {
    title,
    slug: String(formData.get("slug") ?? "").trim() || slugify(title),
    description: String(formData.get("description") ?? ""),
    details: String(formData.get("details") ?? "") || null,
    image: String(formData.get("image") ?? "") || null,
    meeting_time: String(formData.get("meeting_time") ?? "") || null,
    cta_text: String(formData.get("cta_text") ?? "") || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createMinistry(formData: FormData) {
  const supabase = await createClient();
  const data = fields(formData);
  const { error } = await supabase.from("ministries").insert(data);
  if (error) throw new Error(error.message);
  refresh(data.slug);
  redirectWithToast("/admin/ministries", "Ministry added");
}

export async function updateMinistry(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const data = fields(formData);
  const { error } = await supabase
    .from("ministries")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh(data.slug);
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
