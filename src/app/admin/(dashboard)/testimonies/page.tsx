import { createClient } from "@/lib/supabase/server";
import { togglePublish, deleteTestimony } from "./actions";

export default async function TestimoniesAdminPage() {
  const supabase = await createClient();
  const { data: testimonies } = await supabase
    .from("testimonies")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Testimonies</h1>
      <p className="mt-1 text-sm text-slate-500">
        Submissions from the public site start unpublished. Publish the ones you want to show.
      </p>

      <div className="mt-6 space-y-3">
        {testimonies?.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    t.published
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {t.published ? "Published" : "Pending review"}
                </span>
                <p className="font-semibold text-indigo-950">{t.name}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{t.content}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-sm">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="published" value={String(t.published)} />
                  <button type="submit" className="font-semibold text-indigo-700 hover:text-indigo-900">
                    {t.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteTestimony}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit" className="font-semibold text-red-600">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {testimonies?.length === 0 && (
          <p className="text-sm text-slate-500">No testimonies submitted yet.</p>
        )}
      </div>
    </div>
  );
}
