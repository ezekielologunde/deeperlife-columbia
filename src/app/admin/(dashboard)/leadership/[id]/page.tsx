import { createClient } from "@/lib/supabase/server";
import { updateLeader } from "../actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function EditLeaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: leader } = await supabase
    .from("leadership")
    .select("*")
    .eq("id", id)
    .single();

  if (!leader) {
    return <p>Leader not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Leader</h1>
      <form action={updateLeader} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={leader.id} />
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            name="name"
            defaultValue={leader.name}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            defaultValue={leader.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <ImageUploadField label="Photo" name="photo_url" defaultValue={leader.photo_url ?? ""} />
        <label className="block text-sm font-medium text-slate-700">
          Sort Order
          <input
            type="number"
            name="sort_order"
            defaultValue={leader.sort_order}
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
