import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

async function getPost(slug: string) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Deeper Life Bible Church Columbia`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={
          post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : undefined
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            {post.cover_image && (
              <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="h-auto w-full"
                />
              </div>
            )}
            <div className="prose prose-slate max-w-none">
              {post.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph: string, i: number) => (
                  <p key={i} className="mt-4 leading-7 text-slate-700 first:mt-0">
                    {paragraph}
                  </p>
                ))}
            </div>
            {post.author && (
              <p className="mt-8 text-sm font-medium text-slate-500">
                — {post.author}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
