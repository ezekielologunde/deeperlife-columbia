import { CHURCH } from "@/lib/church";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-indigo-950 text-indigo-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-6 text-indigo-200">
            {CHURCH.tagline}
          </p>
          <a
            href={CHURCH.regionalSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-amber-300 hover:text-amber-200"
          >
            {CHURCH.regionalSite.label} →
          </a>
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
              <a href={`tel:${CHURCH.phone}`}>{CHURCH.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
            </li>
            <li>
              <a
                href={CHURCH.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-indigo-900/60 px-6 py-6 text-center text-xs text-indigo-300">
        © {new Date().getFullYear()} {CHURCH.name}. All rights reserved.
      </div>
    </footer>
  );
}
