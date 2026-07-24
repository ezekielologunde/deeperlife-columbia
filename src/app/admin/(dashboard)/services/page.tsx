import { createClient } from "@/lib/supabase/server";
import { createService, deleteService } from "./actions";
import Link from "next/link";

export default async function ServicesAdminPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Service Times</h1>

      <div className="mt-6 space-y-3">
        {services?.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-indigo-950">{s.name}</p>
              <p className="text-sm text-slate-500">
                {s.time} · {s.mode}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link
                href={`/admin/services/${s.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="font-semibold text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Service</h2>
        <form action={createService} className="mt-4 grid gap-4 sm:grid-cols-4">
          <input
            name="name"
            placeholder="Sunday Worship Service"
            required
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            name="time"
            placeholder="9:30 AM"
            required
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <select
            name="mode"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option>In Person</option>
            <option>Zoom Only</option>
          </select>
          <input
            type="hidden"
            name="sort_order"
            value={services?.length ?? 0}
          />
          <button
            type="submit"
            className="sm:col-span-4 rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
