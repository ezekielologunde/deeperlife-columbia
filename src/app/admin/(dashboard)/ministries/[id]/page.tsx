import { createClient } from "@/lib/supabase/server";
import { updateMinistry } from "../actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function EditMinistryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: ministry } = await supabase
    .from("ministries")
    .select("*")
    .eq("id", id)
    .single();

  if (!ministry) {
    return <p>Ministry not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Ministry</h1>
      <form action={updateMinistry} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={ministry.id} />
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            name="title"
            defaultValue={ministry.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            name="description"
            defaultValue={ministry.description}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Full Details (shown on the ministry&apos;s own page)
          <textarea
            name="details"
            defaultValue={ministry.details ?? ""}
            rows={5}
            placeholder="Leave blank to reuse the short description above."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <ImageUploadField label="Image" name="image" defaultValue={ministry.image ?? ""} />
        <label className="block text-sm font-medium text-slate-700">
          Meeting Time
          <input
            name="meeting_time"
            defaultValue={ministry.meeting_time ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          CTA Text
          <input
            name="cta_text"
            defaultValue={ministry.cta_text ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Sort Order
          <input
            type="number"
            name="sort_order"
            defaultValue={ministry.sort_order}
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
