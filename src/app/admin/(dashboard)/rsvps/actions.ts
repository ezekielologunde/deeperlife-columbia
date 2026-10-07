"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { eventRsvps } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function deleteRsvp(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.delete(eventRsvps).where(eq(eventRsvps.id, id));
  revalidatePath("/admin/rsvps");
}
