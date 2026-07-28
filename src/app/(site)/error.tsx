"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function SiteError({
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
    <section className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <Logo className="mx-auto justify-center" />
        <h1 className="mt-10 text-3xl font-bold tracking-tight text-indigo-950">
          Something went wrong
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          We hit a temporary hiccup loading this page. This is usually
          resolved by trying again in a moment.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-indigo-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:scale-105 hover:bg-slate-50"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
