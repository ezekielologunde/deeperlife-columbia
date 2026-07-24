import PostForm from "../PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-indigo-950">New Post</h1>
      <PostForm action={createPost} />
    </div>
  );
}
