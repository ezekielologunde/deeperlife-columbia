import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { addGalleryImage, deleteGalleryImage } from "./actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default async function GalleryAdminPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-indigo-950">Gallery</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images?.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border border-slate-200">
            <div className="relative aspect-square w-full">
              <Image src={img.url} alt={img.caption ?? ""} fill unoptimized className="object-cover" />
            </div>
            <form action={deleteGalleryImage} className="absolute right-2 top-2">
              <input type="hidden" name="id" value={img.id} />
              <button
                type="submit"
                className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-red-600 opacity-0 shadow transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
        {images?.length === 0 && (
          <p className="col-span-full text-sm text-slate-500">No photos yet.</p>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Add Photo</h2>
        <form action={addGalleryImage} className="mt-4 space-y-4">
          <ImageUploadField label="Photo" name="url" />
          <input
            name="caption"
            placeholder="Caption (optional)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input type="hidden" name="sort_order" value={images?.length ?? 0} />
          <button
            type="submit"
            className="rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
