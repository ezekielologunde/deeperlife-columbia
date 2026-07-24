import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createMinistry, deleteMinistry } from "./actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function MinistriesAdminPage() {
  const supabase = await createClient();
  const { data: ministries } = await supabase
    .from("ministries")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Ministries</h1>

      <div className="mt-6 space-y-3">
        {ministries?.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-indigo-950">{m.title}</p>
              <p className="max-w-md truncate text-sm text-slate-500">
                {m.description}
              </p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/ministries/${m.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteMinistry}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="font-semibold text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Ministry</h2>
        <form action={createMinistry} className="mt-4 space-y-4">
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <ImageUploadField label="Image" name="image" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="meeting_time"
              placeholder="Meeting time (optional)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              name="cta_text"
              placeholder="Call to action text (optional)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <input type="hidden" name="sort_order" value={ministries?.length ?? 0} />
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
