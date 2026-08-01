import Link from "next/link";
import { getChurchData } from "@/lib/data";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";

export default async function Footer() {
  const CHURCH = await getChurchData();

  return (
    <footer className="border-t border-slate-200 bg-indigo-950 text-indigo-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-6 text-indigo-200">
            {CHURCH.tagline}
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <a
              href={CHURCH.internationalSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              {CHURCH.internationalSite.label} →
            </a>
            <a
              href={CHURCH.regionalSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              {CHURCH.regionalSite.label} →
            </a>
            <Link
              href="/devotional"
              className="text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              DCLM Daily Manna Devotional →
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
            Visit Us
          </p>
          <p className="mt-3 text-sm leading-6 text-indigo-200">
            {CHURCH.address.line1}
            <br />
            {CHURCH.address.line2}
            <br />
            {CHURCH.address.line3}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
            Service Times
          </p>
          <ul className="mt-3 space-y-1 text-sm leading-6 text-indigo-200">
            {CHURCH.services.map((s) => (
              <li key={s.name}>
                {s.name} — {s.time} ({s.mode})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
            Contact
          </p>
          <ul className="mt-3 space-y-1 text-sm leading-6 text-indigo-200">
            <li>
              <a
                href={`tel:${CHURCH.phone}`}
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                {CHURCH.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CHURCH.email}`}
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                {CHURCH.email}
              </a>
            </li>
            <li>
              <a
                href={CHURCH.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={CHURCH.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={CHURCH.app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                {CHURCH.app.label}
              </a>
            </li>
            <li>
              <a
                href={CHURCH.webcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-indigo-500/60 underline-offset-2 transition-colors hover:text-amber-300 hover:decoration-amber-300"
              >
                {CHURCH.webcast.label}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-indigo-900/60 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">Stay Connected</p>
            <p className="text-sm text-indigo-300">
              Get occasional updates on programs and events.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-indigo-900/60 px-6 py-6 text-center text-xs text-indigo-300">
        © {new Date().getFullYear()} {CHURCH.name}. All rights reserved.
      </div>
    </footer>
  );
}
