import type { Metadata } from "next";
import Image from "next/image";
import { getGalleryImages } from "@/lib/data";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from worship, fellowship, and life together as a church family.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from worship, fellowship, and life together as a church family."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {images.length > 0 ? (
            <StaggerGrid className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <StaggerItem key={img.id}>
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-xl"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                      <Image
                        src={img.url}
                        alt={img.caption ?? "Church gallery photo"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <p className="text-center text-slate-500">
              Photos from church life will appear here soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
