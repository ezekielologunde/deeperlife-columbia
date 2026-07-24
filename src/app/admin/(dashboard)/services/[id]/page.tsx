import { createClient } from "@/lib/supabase/server";
import { updateService } from "../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) {
    return <p>Service not found.</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Service</h1>
      <form action={updateService} className="mt-6 space-y-4">
        <input type="hidden" name="id" value={service.id} />
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            name="name"
            defaultValue={service.name}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Time
          <input
            name="time"
            defaultValue={service.time}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Mode
          <select
            name="mode"
            defaultValue={service.mode}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>In Person</option>
            <option>Zoom Only</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Sort Order
          <input
            type="number"
            name="sort_order"
            defaultValue={service.sort_order}
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
