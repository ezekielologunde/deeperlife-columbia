"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { leadership } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

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
  await requireAdmin();
  await db.insert(leadership).values(fields(formData));
  refresh();
  redirectWithToast("/admin/leadership", "Leader added");
}

export async function updateLeader(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.update(leadership).set(fields(formData)).where(eq(leadership.id, id));
  refresh();
  redirectWithToast("/admin/leadership", "Leader updated");
}

export async function deleteLeader(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(leadership).where(eq(leadership.id, id));
  refresh();
  redirectWithToast("/admin/leadership", "Leader deleted");
}
