"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").insert({
    name: String(formData.get("name") ?? ""),
    time: String(formData.get("time") ?? ""),
    mode: String(formData.get("mode") ?? "In Person"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/services", "Service added");
}

export async function updateService(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("services")
    .update({
      name: String(formData.get("name") ?? ""),
      time: String(formData.get("time") ?? ""),
      mode: String(formData.get("mode") ?? "In Person"),
      sort_order: Number(formData.get("sort_order") ?? 0),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/services", "Service updated");
}

export async function deleteService(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
  redirectWithToast("/admin/services", "Service deleted");
}
