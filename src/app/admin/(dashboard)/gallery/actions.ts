"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function addGalleryImage(formData: FormData) {
  const supabase = await createClient();
  const url = String(formData.get("url") ?? "");
  const caption = String(formData.get("caption") ?? "") || null;
  const sort_order = Number(formData.get("sort_order") ?? 0);

  if (!url) {
    redirectWithToast("/admin/gallery", "Please upload or paste an image URL");
  }

  const { error } = await supabase
    .from("gallery_images")
    .insert({ url, caption, sort_order });
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/gallery", "Photo added");
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/gallery", "Photo removed");
}
