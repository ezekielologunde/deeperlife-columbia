"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploadField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);

      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        <input
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https:// or upload below"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <div className="mt-2 flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="text-xs text-slate-500"
        />
        {uploading && <span className="text-xs text-indigo-600">Uploading…</span>}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {url && (
        <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-slate-200">
          <Image
            src={url}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
