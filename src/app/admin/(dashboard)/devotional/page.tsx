import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createDevotional, deleteDevotional } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function DevotionalAdminPage() {
  const supabase = await createClient();
  const { data: devotionals } = await supabase
    .from("devotionals")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Daily Devotional</h1>
      <p className="mt-1 text-sm text-slate-500">
        Synced automatically each morning from DCLM Daily Manna. If a day is
        missing (the auto-sync failed), add it here manually.
      </p>

      <div className="mt-6 space-y-3">
        {devotionals?.map((d) => (
          <div
            key={d.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <span
                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  d.source === "dclm_api"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {d.source === "dclm_api" ? "Auto-synced" : "Manual"}
              </span>
              <p className="font-semibold text-indigo-950">
                {d.date} — {d.title}
              </p>
              <p className="max-w-md truncate text-sm text-slate-500">
                {d.key_verse}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/devotional/${d.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteDevotional}>
                <input type="hidden" name="id" value={d.id} />
                <input type="hidden" name="date" value={d.date} />
                <DeleteButton
                  confirmText={`Delete the devotional for ${d.date}? This cannot be undone.`}
                />
              </form>
            </div>
          </div>
        ))}
        {devotionals?.length === 0 && (
          <p className="text-sm text-slate-500">No devotionals yet.</p>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Devotional</h2>
        <form action={createDevotional} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Date
              <input
                type="date"
                name="date"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Title
              <input
                name="title"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Key Verse
            <textarea
              name="key_verse"
              required
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Bible Reading (e.g. "1 Corinthians 1:26-31")
            <input
              name="bible_reading"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Body
            <textarea
              name="body"
              required
              rows={8}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Thought for the Day
            <textarea
              name="thought_of_day"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Bible in One Year (optional)
            <input
              name="bible_in_one_year"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
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
