import ImageUploadField from "@/components/admin/ImageUploadField";

type Post = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  body?: string;
  cover_image?: string | null;
  author?: string | null;
  published?: boolean;
};

export default function PostForm({
  action,
  post,
}: {
  action: (formData: FormData) => void;
  post?: Post;
}) {
  return (
    <form action={action} className="mt-6 space-y-4">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <label className="block text-sm font-medium text-slate-700">
        Title
        <input
          name="title"
          defaultValue={post?.title}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Slug (leave blank to auto-generate from title)
        <input
          name="slug"
          defaultValue={post?.slug}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Excerpt
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Body
        <textarea
          name="body"
          defaultValue={post?.body ?? ""}
          required
          rows={10}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </label>
      <ImageUploadField
        label="Cover Image"
        name="cover_image"
        defaultValue={post?.cover_image ?? ""}
      />
      <label className="block text-sm font-medium text-slate-700">
        Author
        <input
          name="author"
          defaultValue={post?.author ?? ""}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="published" defaultChecked={post?.published} />
        Published
      </label>
      <button
        type="submit"
        className="rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
      >
        Save
      </button>
    </form>
  );
}
