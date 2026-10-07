"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { galleryImages } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function addGalleryImage(formData: FormData) {
  await requireAdmin();
  const url = String(formData.get("url") ?? "");
  const caption = String(formData.get("caption") ?? "") || null;
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!url) {
    redirectWithToast("/admin/gallery", "Please upload or paste an image URL");
  }

  await db.insert(galleryImages).values({ url, caption, sort_order });
  refresh();
  redirectWithToast("/admin/gallery", "Photo added");
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  refresh();
  redirectWithToast("/admin/gallery", "Photo removed");
}
