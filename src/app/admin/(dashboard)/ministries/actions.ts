"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ministries } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
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
  await requireAdmin();
  const data = fields(formData);
  await db.insert(ministries).values(data);
  refresh(data.slug);
  redirectWithToast("/admin/ministries", "Ministry added");
}

export async function updateMinistry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = fields(formData);
  await db.update(ministries).set(data).where(eq(ministries.id, id));
  refresh(data.slug);
  redirectWithToast("/admin/ministries", "Ministry updated");
}

export async function deleteMinistry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(ministries).where(eq(ministries.id, id));
  refresh();
  redirectWithToast("/admin/ministries", "Ministry deleted");
}
