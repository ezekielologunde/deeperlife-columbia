import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { posts } from "@/lib/db/schema";
import PostForm from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

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
