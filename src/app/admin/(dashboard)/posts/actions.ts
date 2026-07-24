"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function refresh(slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/admin/posts");
  revalidatePath("/posts");
  if (slug) revalidatePath(`/posts/${slug}`);
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
  const published = formData.get("published") === "on";
  return {
    title,
    slug: String(formData.get("slug") ?? "").trim() || slugify(title),
    excerpt: String(formData.get("excerpt") ?? "") || null,
    body: String(formData.get("body") ?? ""),
    cover_image: String(formData.get("cover_image") ?? "") || null,
    author: String(formData.get("author") ?? "") || null,
    published,
    published_at: published ? new Date().toISOString() : null,
  };
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const data = fields(formData);
  const { error } = await supabase.from("posts").insert(data);
  if (error) throw new Error(error.message);
  refresh(data.slug);
  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const data = fields(formData);
  const { error } = await supabase.from("posts").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  refresh(data.slug);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh(slug);
}
