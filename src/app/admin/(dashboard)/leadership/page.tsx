import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createLeader, deleteLeader } from "./actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function LeadershipAdminPage() {
  const supabase = await createClient();
  const { data: leaders } = await supabase
    .from("leadership")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Leadership</h1>

      <div className="mt-6 space-y-3">
        {leaders?.map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-indigo-950">{l.name}</p>
              <p className="text-sm text-slate-500">{l.title}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link
                href={`/admin/leadership/${l.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteLeader}>
                <input type="hidden" name="id" value={l.id} />
                <button type="submit" className="font-semibold text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Leader</h2>
        <form action={createLeader} className="mt-4 space-y-4">
          <input
            name="name"
            placeholder="Name"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <ImageUploadField label="Photo" name="photo_url" />
          <input type="hidden" name="sort_order" value={leaders?.length ?? 0} />
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
