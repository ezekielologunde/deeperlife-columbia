"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { admins } from "@/lib/db/schema";
import { verifyPassword } from "@/lib/auth/password";
import {
  signSession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/session";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  const valid = admin ? await verifyPassword(password, admin.password_hash) : false;

  if (!admin || !valid) {
    redirect(`/admin/login?error=${encodeURIComponent("Invalid email or password")}`);
  }

  const token = await signSession({ sub: admin.id, email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

  redirect("/admin");
}
