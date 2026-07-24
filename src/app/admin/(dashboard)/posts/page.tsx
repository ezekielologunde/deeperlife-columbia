import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "./actions";

export default async function PostsAdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-950">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-indigo-900 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          New Post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts?.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <span
                className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  p.published
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
              <p className="font-semibold text-indigo-950">{p.title}</p>
              <p className="text-sm text-slate-500">/posts/{p.slug}</p>
            </div>
            <div className="flex shrink-0 gap-3 text-sm">
              <Link
                href={`/admin/posts/${p.id}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                Edit
              </Link>
              <form action={deletePost}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="slug" value={p.slug} />
                <button type="submit" className="font-semibold text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {posts?.length === 0 && (
          <p className="text-sm text-slate-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
