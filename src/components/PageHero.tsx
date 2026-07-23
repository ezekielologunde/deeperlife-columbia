import Reveal from "@/components/Reveal";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-indigo-200">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
