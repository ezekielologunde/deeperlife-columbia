"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

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
  await requireAdmin();
  const data = fields(formData);
  await db.insert(posts).values(data);
  refresh(data.slug);
  redirectWithToast("/admin/posts", "Post created");
}

export async function updatePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = fields(formData);
  await db.update(posts).set(data).where(eq(posts.id, id));
  refresh(data.slug);
  redirectWithToast("/admin/posts", "Post updated");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  await db.delete(posts).where(eq(posts.id, id));
  refresh(slug);
  redirectWithToast("/admin/posts", "Post deleted");
}
