import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createEvent, deleteEvent } from "./actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function EventsAdminPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("is_past")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Events</h1>

      <div className="mt-6 space-y-3">
        {events?.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <span
                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  e.is_past
                    ? "bg-slate-100 text-slate-600"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {e.is_past ? "Past" : "Upcoming"}
              </span>
              <p className="font-semibold text-indigo-950">{e.title}</p>
              <p className="text-sm text-slate-500">{e.event_date}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/events/${e.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <DeleteButton confirmText={`Delete the event "${e.title}"? This cannot be undone.`} />
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Event</h2>
        <form action={createEvent} className="mt-4 space-y-4">
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            name="subtitle"
            placeholder="Subtitle"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="event_date"
              placeholder="Date (e.g. Thursday, August 6)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              name="event_time"
              placeholder="Time"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <input
            name="venue"
            placeholder="Venue (for past events)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            name="verse"
            placeholder="Verse"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            name="host"
            placeholder="Host"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <ImageUploadField label="Flyer Image" name="flyer" />
          <input
            name="video"
            placeholder="Video URL"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            name="link"
            placeholder="Registration / details link"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="phone"
              placeholder="Contact phone"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              name="email"
              placeholder="Contact email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" name="is_past" />
            This is a past event
          </label>
          <input type="hidden" name="sort_order" value={events?.length ?? 0} />
          <button
            type="submit"
            className="rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
