import { createClient } from "@/lib/supabase/server";
import { updateEvent } from "../actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Event</h1>
      <form action={updateEvent} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={event.id} />
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            defaultValue={event.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Subtitle
          <input
            name="subtitle"
            defaultValue={event.subtitle ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Date
            <input
              name="event_date"
              defaultValue={event.event_date ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Time
            <input
              name="event_time"
              defaultValue={event.event_time ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-700">
          Venue
          <input
            name="venue"
            defaultValue={event.venue ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            name="description"
            defaultValue={event.description ?? ""}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Verse
          <input
            name="verse"
            defaultValue={event.verse ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Host
          <input
            name="host"
            defaultValue={event.host ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <ImageUploadField label="Flyer Image" name="flyer" defaultValue={event.flyer ?? ""} />
        <label className="block text-sm font-medium text-slate-700">
          Video URL
          <input
            name="video"
            defaultValue={event.video ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Link
          <input
            name="link"
            defaultValue={event.link ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Phone
            <input
              name="phone"
              defaultValue={event.phone ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              name="email"
              defaultValue={event.email ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="is_past" defaultChecked={event.is_past} />
          This is a past event
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Sort Order
          <input
            type="number"
            name="sort_order"
            defaultValue={event.sort_order}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
