"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { testimonies } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/testimonies");
  revalidatePath("/testimonies");
}

export async function togglePublish(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  await db.update(testimonies).set({ published: !published }).where(eq(testimonies.id, id));
  refresh();
  redirectWithToast(
    "/admin/testimonies",
    !published ? "Testimony published" : "Testimony unpublished",
  );
}

export async function deleteTestimony(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(testimonies).where(eq(testimonies.id, id));
  refresh();
  redirectWithToast("/admin/testimonies", "Testimony deleted");
}
