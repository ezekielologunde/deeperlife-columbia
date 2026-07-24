import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Posts",
  description: "News, announcements, and messages from the church.",
};

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <>
      <PageHero
        title="Posts"
        subtitle="News, announcements, and messages from the church."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {posts && posts.length > 0 ? (
            <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {post.cover_image && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.published_at && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                          {new Date(post.published_at).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </p>
                      )}
                      <h2 className="mt-2 text-lg font-bold text-indigo-950">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <Reveal>
              <p className="text-center text-slate-500">
                No posts yet — check back soon.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
