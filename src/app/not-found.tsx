import Link from "next/link";

export default function RootNotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page you&apos;re looking for may have moved or no longer
          exists.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-full bg-indigo-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
