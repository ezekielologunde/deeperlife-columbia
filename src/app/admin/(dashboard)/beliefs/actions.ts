"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { statementOfFaith } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

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
  await requireAdmin();
  await db.insert(statementOfFaith).values(fields(formData));
  refresh();
  redirectWithToast("/admin/beliefs", "Belief added");
}

export async function updateBelief(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.update(statementOfFaith).set(fields(formData)).where(eq(statementOfFaith.id, id));
  refresh();
  redirectWithToast("/admin/beliefs", "Belief updated");
}

export async function deleteBelief(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(statementOfFaith).where(eq(statementOfFaith.id, id));
  refresh();
  redirectWithToast("/admin/beliefs", "Belief deleted");
}
