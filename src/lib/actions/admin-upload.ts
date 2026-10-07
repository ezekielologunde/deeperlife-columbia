"use server";

import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth/require-admin";

export type UploadResult = { url: string } | { error: string };

// Routed through a Server Action (rather than a client-side direct-upload
// token flow) specifically so requireAdmin() gates it the same way as
// every other admin mutation — one checked path, not two differently
// protected ones.
export async function uploadAdminImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided" };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed" };
  }

  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  try {
    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return { url: blob.url };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}
