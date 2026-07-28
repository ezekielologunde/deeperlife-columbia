import { createClient } from "@/lib/supabase/server";
import { deleteSubscriber } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function SubscribersAdminPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-950">Subscribers</h1>
        {subscribers && subscribers.length > 0 && (
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(
              "email,subscribed_at\n" +
                subscribers
                  .map((s) => `${s.email},${s.created_at}`)
                  .join("\n"),
            )}`}
            download="subscribers.csv"
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          >
            Export CSV
          </a>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-500">
        {subscribers?.length ?? 0} newsletter subscriber
        {subscribers?.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-6 space-y-2">
        {subscribers?.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-indigo-950">{s.email}</p>
              <p className="text-xs text-slate-400">
                {new Date(s.created_at).toLocaleDateString()}
              </p>
            </div>
            <form action={deleteSubscriber}>
              <input type="hidden" name="id" value={s.id} />
              <DeleteButton
                confirmText={`Remove ${s.email} from the newsletter list?`}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Remove
              </DeleteButton>
            </form>
          </div>
        ))}
        {subscribers?.length === 0 && (
          <p className="text-sm text-slate-500">No subscribers yet.</p>
        )}
      </div>
    </div>
  );
}
