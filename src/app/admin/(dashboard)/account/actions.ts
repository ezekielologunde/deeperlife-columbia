"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { admins } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { requireAdmin } from "@/lib/auth/require-admin";
import type { FormState } from "@/lib/actions/public";

export async function updatePassword(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { success: false, error: "Passwords do not match." };
  }

  const session = await requireAdmin();

  try {
    const password_hash = await hashPassword(password);
    await db.update(admins).set({ password_hash }).where(eq(admins.id, session.sub));
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong.",
    };
  }

  return { success: true };
}
