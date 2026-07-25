import { createClient } from "@/lib/supabase/server";
import { deleteRsvp } from "./actions";

export default async function RsvpsAdminPage() {
  const supabase = await createClient();
  const { data: rsvps } = await supabase
    .from("event_rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  const groups = new Map<string, typeof rsvps>();
  for (const r of rsvps ?? []) {
    const list = groups.get(r.event_title) ?? [];
    list.push(r);
    groups.set(r.event_title, list);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Event RSVPs</h1>
      <p className="mt-1 text-sm text-slate-500">
        {rsvps?.length ?? 0} total RSVP{rsvps?.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-6 space-y-8">
        {[...groups.entries()].map(([eventTitle, list]) => {
          const totalGuests = list!.reduce((sum, r) => sum + r.guests, 0);
          return (
            <div key={eventTitle}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-bold text-indigo-950">{eventTitle}</h2>
                <span className="text-sm text-slate-500">
                  {list!.length} response{list!.length === 1 ? "" : "s"} ·{" "}
                  {totalGuests} guest{totalGuests === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {list!.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-indigo-950">
                        {r.name}{" "}
                        <span className="font-normal text-slate-500">
                          ({r.guests} guest{r.guests === 1 ? "" : "s"})
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        {r.email}
                        {r.phone && <> · {r.phone}</>}
                      </p>
                    </div>
                    <form action={deleteRsvp}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="text-sm font-semibold text-red-600"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {(!rsvps || rsvps.length === 0) && (
          <p className="text-sm text-slate-500">No RSVPs yet.</p>
        )}
      </div>
    </div>
  );
}
