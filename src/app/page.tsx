import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import Hero from "@/components/Hero";

const QUICK_LINKS = [
  {
    href: "/services",
    title: "Service Times",
    desc: "See when we gather for worship, in person and online.",
  },
  {
    href: "/join-online",
    title: "Join Online",
    desc: "Zoom link, meeting ID, and passcode for midweek meetings.",
  },
  {
    href: "/about",
    title: "About Us",
    desc: "Our story, what we believe, and our pastor.",
  },
  {
    href: "/ministries",
    title: "Ministries",
    desc: "Find your place to grow and serve.",
  },
  {
    href: "/events",
    title: "Upcoming Program",
    desc: "Global Prayer for World Harvest — Thursday, August 6.",
  },
  {
    href: "/give",
    title: "Give",
    desc: "Support the work of God through tithes and offerings.",
  },
  {
    href: "/sermons",
    title: "Sermons",
    desc: "Watch and follow our latest messages.",
  },
  {
    href: "/contact",
    title: "Plan Your Visit",
    desc: "Address, phone, email, and directions.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Get Started
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Everything you need to connect with {CHURCH.name}.
            </p>
          </Reveal>

          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <StaggerItem key={link.href}>
                <a
                  href={link.href}
                  className="block h-full rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold text-indigo-950">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {link.desc}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-indigo-700">
                    Learn more →
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
