import { createClient } from "@/lib/supabase/server";
import { updateChurchInfo } from "./actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      />
    </label>
  );
}

export default async function ChurchInfoPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("church_settings")
    .select("*")
    .eq("id", 1)
    .single();

  const address = (settings?.address ?? {}) as Record<string, string>;
  const zoom = (settings?.zoom ?? {}) as Record<string, string>;
  const giving = (settings?.giving ?? {}) as Record<string, string>;
  const social = (settings?.social ?? {}) as Record<string, string>;
  const international = (settings?.international_site ?? {}) as Record<
    string,
    string
  >;
  const regional = (settings?.regional_site ?? {}) as Record<string, string>;
  const app = (settings?.app ?? {}) as Record<string, string>;
  const webcast = (settings?.webcast ?? {}) as Record<string, string>;
  const description = Array.isArray(settings?.description)
    ? (settings.description as string[]).join("\n\n")
    : "";

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Church Info</h1>
      <p className="mt-1 text-sm text-slate-500">
        Core details shown across the whole site.
      </p>

      <form action={updateChurchInfo} className="mt-8 space-y-8">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Basics</h2>
          <Field label="Church Name" name="name" defaultValue={settings?.name} />
          <Field label="Tagline" name="tagline" defaultValue={settings?.tagline} />
          <label className="block text-sm font-medium text-slate-700">
            Description (separate paragraphs with a blank line)
            <textarea
              name="description"
              rows={6}
              defaultValue={description}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            History
            <textarea
              name="history"
              rows={4}
              defaultValue={settings?.history}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Address & Contact</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Address Line 1" name="address_line1" defaultValue={address.line1} />
            <Field label="Address Line 2" name="address_line2" defaultValue={address.line2} />
            <Field label="Address Line 3" name="address_line3" defaultValue={address.line3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone (E.164, e.g. +14102021094)" name="phone" defaultValue={settings?.phone} />
            <Field label="Phone Display" name="phone_display" defaultValue={settings?.phone_display} />
          </div>
          <Field label="Email" name="email" defaultValue={settings?.email} />
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Pastor</h2>
          <Field label="Pastor Name" name="pastor" defaultValue={settings?.pastor} />
          <ImageUploadField label="Pastor Photo" name="pastor_photo" defaultValue={settings?.pastor_photo} />
          <ImageUploadField
            label="Pastor + Wife Photo"
            name="pastor_and_wife_photo"
            defaultValue={settings?.pastor_and_wife_photo}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Zoom</h2>
          <Field label="Zoom Link" name="zoom_link" defaultValue={zoom.link} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Meeting ID" name="zoom_meeting_id" defaultValue={zoom.meetingId} />
            <Field label="Passcode" name="zoom_passcode" defaultValue={zoom.passcode} />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Giving</h2>
          <Field label="Zelle ID / Email" name="giving_zelle_id" defaultValue={giving.zelleId} />
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Social Media</h2>
          <Field label="Facebook URL" name="social_facebook" defaultValue={social.facebook} />
          <Field label="Instagram URL" name="social_instagram" defaultValue={social.instagram} />
          <Field label="YouTube URL" name="social_youtube" defaultValue={social.youtube} />
          <Field
            label="YouTube Uploads Playlist ID (for sermon archive)"
            name="youtube_playlist_id"
            defaultValue={settings?.youtube_uploads_playlist_id}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-indigo-950">Affiliated Sites</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="International Site Label" name="international_label" defaultValue={international.label} />
            <Field label="International Site URL" name="international_url" defaultValue={international.url} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Regional Site Label" name="regional_label" defaultValue={regional.label} />
            <Field label="Regional Site URL" name="regional_url" defaultValue={regional.url} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="App Label" name="app_label" defaultValue={app.label} />
            <Field label="App URL" name="app_url" defaultValue={app.url} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Webcast Label" name="webcast_label" defaultValue={webcast.label} />
            <Field label="Webcast URL" name="webcast_url" defaultValue={webcast.url} />
          </div>
        </section>

        <button
          type="submit"
          className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
