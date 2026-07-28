import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-white">
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <Logo className="mx-auto justify-center" />
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page you&apos;re looking for may have moved or no longer
          exists. Here are a few places to start instead.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-indigo-900 px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:scale-105 hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/services" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Service Times
          </Link>
          <Link href="/events" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Events
          </Link>
          <Link href="/ministries" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Ministries
          </Link>
          <Link href="/sermons" className="font-semibold text-indigo-700 hover:text-indigo-900">
            Sermons
          </Link>
        </div>
      </div>
    </section>
  );
}
