import { createClient } from "@/lib/supabase/server";
import { updateBelief } from "../actions";

export default async function EditBeliefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: belief } = await supabase
    .from("statement_of_faith")
    .select("*")
    .eq("id", id)
    .single();

  if (!belief) {
    return <p>Belief not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Belief</h1>
      <form action={updateBelief} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={belief.id} />
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            defaultValue={belief.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Text
          <textarea
            name="text"
            defaultValue={belief.text}
            required
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Sort Order
          <input
            type="number"
            name="sort_order"
            defaultValue={belief.sort_order}
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
