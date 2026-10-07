"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { devotionals } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

const CATEGORY_PATH: Record<string, string> = {
  Adult: "/devotional",
  Youth: "/devotional/youth",
  Children: "/devotional/children",
};

function refresh(date?: string, category?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/admin/devotional");
  const base = CATEGORY_PATH[category ?? "Adult"] ?? "/devotional";
  revalidatePath(base);
  revalidatePath(`${base}/archive`);
  if (date) revalidatePath(`${base}/${date}`);
}

function fields(formData: FormData) {
  return {
    date: String(formData.get("date") ?? ""),
    category: String(formData.get("category") ?? "Adult"),
    title: String(formData.get("title") ?? ""),
    key_verse: String(formData.get("key_verse") ?? ""),
    bible_reading: String(formData.get("bible_reading") ?? "") || null,
    body: String(formData.get("body") ?? ""),
    thought_of_day: String(formData.get("thought_of_day") ?? "") || null,
    bible_in_one_year: String(formData.get("bible_in_one_year") ?? "") || null,
    source: "manual",
  };
}

export async function createDevotional(formData: FormData) {
  await requireAdmin();
  const data = fields(formData);
  await db.insert(devotionals).values(data);
  refresh(data.date, data.category);
  redirectWithToast("/admin/devotional", "Devotional added");
}

export async function updateDevotional(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = fields(formData);
  await db.update(devotionals).set(data).where(eq(devotionals.id, id));
  refresh(data.date, data.category);
  redirectWithToast("/admin/devotional", "Devotional updated");
}

export async function deleteDevotional(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const date = String(formData.get("date") ?? "");
  const category = String(formData.get("category") ?? "Adult");
  await db.delete(devotionals).where(eq(devotionals.id, id));
  refresh(date, category);
  redirectWithToast("/admin/devotional", "Devotional deleted");
}
