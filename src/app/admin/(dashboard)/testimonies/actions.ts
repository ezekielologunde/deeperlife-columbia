"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/testimonies");
  revalidatePath("/testimonies");
}

export async function togglePublish(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  const { error } = await supabase
    .from("testimonies")
    .update({ published: !published })
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast(
    "/admin/testimonies",
    !published ? "Testimony published" : "Testimony unpublished",
  );
}

export async function deleteTestimony(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("testimonies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/testimonies", "Testimony deleted");
}
