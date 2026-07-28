"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white text-slate-900">
        <div className="mx-auto max-w-md px-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-950">
            Something went wrong
          </h1>
          <p className="mt-3 text-slate-600">
            The site hit an unexpected error. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
