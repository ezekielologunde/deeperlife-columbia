import Reveal from "@/components/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.12),transparent_45%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Reveal>
          <div className="flex gap-6">
            <span
              aria-hidden
              className="w-1 shrink-0 rounded-full bg-amber-400"
            />
            <div>
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
                  {eyebrow}
                </p>
              )}
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 max-w-2xl text-indigo-200">{subtitle}</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
