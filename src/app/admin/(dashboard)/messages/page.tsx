import { createClient } from "@/lib/supabase/server";
import { markRead, deleteMessage } from "./actions";

const CATEGORY_LABEL: Record<string, string> = {
  general: "General",
  prayer: "Prayer Request",
  other: "Other",
};

export default async function MessagesAdminPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Messages</h1>
      <p className="mt-1 text-sm text-slate-500">
        Submissions from the Contact page form.
      </p>

      <div className="mt-6 space-y-3">
        {messages?.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-5 ${
              m.is_read
                ? "border-slate-200 bg-white"
                : "border-indigo-200 bg-indigo-50"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {!m.is_read && (
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                )}
                <p className="font-semibold text-indigo-950">{m.name}</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {CATEGORY_LABEL[m.category] ?? m.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {new Date(m.created_at).toLocaleString()}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              <a href={`mailto:${m.email}`} className="hover:text-indigo-700">
                {m.email}
              </a>
              {m.phone && <> · {m.phone}</>}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{m.body}</p>
            <div className="mt-4 flex gap-3 text-sm">
              {!m.is_read && (
                <form action={markRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="font-semibold text-indigo-700">
                    Mark as read
                  </button>
                </form>
              )}
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="font-semibold text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {messages?.length === 0 && (
          <p className="text-sm text-slate-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
