"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadAdminImage } from "@/lib/actions/admin-upload";

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
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadAdminImage(formData);

      if ("error" in result) {
        setError(result.error);
      } else {
        setUrl(result.url);
      }
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
