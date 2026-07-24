"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateChurchInfo(formData: FormData) {
  const supabase = await createClient();

  const description = str(formData, "description")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("church_settings")
    .update({
      name: str(formData, "name"),
      tagline: str(formData, "tagline"),
      description,
      history: str(formData, "history"),
      address: {
        line1: str(formData, "address_line1"),
        line2: str(formData, "address_line2"),
        line3: str(formData, "address_line3"),
      },
      phone: str(formData, "phone"),
      phone_display: str(formData, "phone_display"),
      email: str(formData, "email"),
      pastor: str(formData, "pastor"),
      pastor_photo: str(formData, "pastor_photo"),
      pastor_and_wife_photo: str(formData, "pastor_and_wife_photo"),
      zoom: {
        link: str(formData, "zoom_link"),
        meetingId: str(formData, "zoom_meeting_id"),
        passcode: str(formData, "zoom_passcode"),
      },
      giving: {
        zelleId: str(formData, "giving_zelle_id"),
      },
      social: {
        facebook: str(formData, "social_facebook"),
        instagram: str(formData, "social_instagram"),
        youtube: str(formData, "social_youtube"),
      },
      international_site: {
        label: str(formData, "international_label"),
        url: str(formData, "international_url"),
      },
      regional_site: {
        label: str(formData, "regional_label"),
        url: str(formData, "regional_url"),
      },
      app: {
        label: str(formData, "app_label"),
        url: str(formData, "app_url"),
      },
      webcast: {
        label: str(formData, "webcast_label"),
        url: str(formData, "webcast_url"),
      },
      youtube_uploads_playlist_id: str(formData, "youtube_playlist_id"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/church-info");
}
