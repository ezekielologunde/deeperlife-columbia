"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <h1 className="text-xl font-bold text-red-900">
        Something went wrong loading this page
      </h1>
      <p className="mt-3 text-sm leading-6 text-red-800">
        This is usually a temporary connection issue with the database.
        Try again in a moment — if it keeps happening, your changes are
        safe and nothing has been lost.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-indigo-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          Try Again
        </button>
        <Link
          href="/admin"
          className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
