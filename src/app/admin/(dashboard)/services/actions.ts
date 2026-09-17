"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { services } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  await requireAdmin();
  await db.insert(services).values({
    name: String(formData.get("name") ?? ""),
    time: String(formData.get("time") ?? ""),
    mode: String(formData.get("mode") ?? "In Person"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh();
  redirectWithToast("/admin/services", "Service added");
}

export async function updateService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db
    .update(services)
    .set({
      name: String(formData.get("name") ?? ""),
      time: String(formData.get("time") ?? ""),
      mode: String(formData.get("mode") ?? "In Person"),
      sort_order: Number(formData.get("sort_order") ?? 0),
    })
    .where(eq(services.id, id));
  refresh();
  redirectWithToast("/admin/services", "Service updated");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(services).where(eq(services.id, id));
  refresh();
  redirectWithToast("/admin/services", "Service deleted");
}
