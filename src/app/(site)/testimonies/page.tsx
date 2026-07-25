import type { Metadata } from "next";
import { getTestimonies } from "@/lib/data";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";
import TestimonyForm from "@/components/TestimonyForm";

export const metadata: Metadata = {
  title: "Testimonies",
  description: "Stories of what God has done in the lives of our members.",
};

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies();

  return (
    <>
      <PageHero
        title="Testimonies"
        subtitle="Stories of God's faithfulness from our church family."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          {testimonies.length > 0 ? (
            <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonies.map((t) => (
                <StaggerItem key={t.id}>
                  <div className="h-full rounded-2xl border border-slate-200 p-7 shadow-sm">
                    <svg
                      width="28"
                      height="22"
                      viewBox="0 0 28 22"
                      fill="none"
                      className="text-indigo-200"
                      aria-hidden
                    >
                      <path
                        d="M0 22V13.2C0 8.8 1.2 5.4 3.6 3 6 0.6 9 -0.6 12.6 0.4L11 5.2C8.8 4.6 7 5 5.6 6.4 4.2 7.8 3.5 9.8 3.6 12.4H10V22H0ZM15.4 22V13.2C15.4 8.8 16.6 5.4 19 3 21.4 0.6 24.4 -0.6 28 0.4L26.4 5.2C24.2 4.6 22.4 5 21 6.4 19.6 7.8 18.9 9.8 19 12.4H25.4V22H15.4Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="mt-4 leading-7 text-slate-700">{t.content}</p>
                    <p className="mt-5 text-sm font-semibold text-indigo-900">
                      — {t.name}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <p className="text-center text-slate-500">
              Testimonies from our church family will appear here soon.
            </p>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
        <div className="mx-auto max-w-xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
            Share Your Testimony
          </h2>
          <p className="mt-3 text-center text-lg text-slate-600">
            Let others be encouraged by what God has done for you.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <TestimonyForm />
          </div>
        </div>
      </section>
    </>
  );
}
