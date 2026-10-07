"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { messages } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";
import { redirectWithToast } from "@/lib/admin/toast-redirect";

export async function markRead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.update(messages).set({ is_read: true }).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(messages).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
  redirectWithToast("/admin/messages", "Message deleted");
}
