import { createClient } from "@/lib/supabase/server";
import { updateDevotional } from "../actions";

export default async function EditDevotionalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: devotional } = await supabase
    .from("devotionals")
    .select("*")
    .eq("id", id)
    .single();

  if (!devotional) {
    return <p>Devotional not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Devotional</h1>
      <form action={updateDevotional} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={devotional.id} />
        <label className="block text-sm font-medium text-slate-700">
          Date
          <input
            type="date"
            name="date"
            defaultValue={devotional.date}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            defaultValue={devotional.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Key Verse
          <textarea
            name="key_verse"
            defaultValue={devotional.key_verse}
            required
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Bible Reading
          <input
            name="bible_reading"
            defaultValue={devotional.bible_reading ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Body
          <textarea
            name="body"
            defaultValue={devotional.body}
            required
            rows={10}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Thought for the Day
          <textarea
            name="thought_of_day"
            defaultValue={devotional.thought_of_day ?? ""}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Bible in One Year
          <input
            name="bible_in_one_year"
            defaultValue={devotional.bible_in_one_year ?? ""}
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
