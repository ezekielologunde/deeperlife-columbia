import { createClient } from "@/lib/supabase/server";
import PostForm from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-indigo-950">Edit Post</h1>
      <PostForm action={updatePost} post={post} />
    </div>
  );
}
