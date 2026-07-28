import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createBelief, deleteBelief } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function BeliefsAdminPage() {
  const supabase = await createClient();
  const { data: beliefs } = await supabase
    .from("statement_of_faith")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">
        Statement of Faith
      </h1>

      <div className="mt-6 space-y-3">
        {beliefs?.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-indigo-950">{b.title}</p>
              <p className="max-w-md truncate text-sm text-slate-500">
                {b.text}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/beliefs/${b.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteBelief}>
                <input type="hidden" name="id" value={b.id} />
                <DeleteButton confirmText={`Delete "${b.title}" from the Statement of Faith? This cannot be undone.`} />
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Belief</h2>
        <form action={createBelief} className="mt-4 space-y-4">
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            name="text"
            placeholder="Text"
            required
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input type="hidden" name="sort_order" value={beliefs?.length ?? 0} />
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
