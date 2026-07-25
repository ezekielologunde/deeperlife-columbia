import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Steps to Salvation",
  description: "How to receive Jesus Christ as your personal Lord and Savior.",
};

const STEPS = [
  {
    title: "Admit you are a sinner",
    verse: "Romans 3:23",
    text: "“For all have sinned, and come short of the glory of God.” Every person has fallen short of God's standard and needs to be honest about it before Him.",
  },
  {
    title: "Understand the consequence of sin",
    verse: "Romans 6:23",
    text: "“For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.” Sin separates us from God, but He has provided a way back.",
  },
  {
    title: "Believe Christ died for you",
    verse: "Romans 5:8",
    text: "“God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.” Jesus took the punishment for sin so you would not have to.",
  },
  {
    title: "Repent and confess Christ as Lord",
    verse: "Romans 10:9-10",
    text: "“If thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.” Turn from sin and surrender your life to Him.",
  },
  {
    title: "Receive Him by faith",
    verse: "John 1:12",
    text: "“As many as received him, to them gave he power to become the sons of God, even to them that believe on his name.” Salvation is received, not earned.",
  },
];

export default function SalvationPage() {
  return (
    <>
      <PageHero
        title="Steps to Salvation"
        subtitle="You can know for certain that you have eternal life today."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <p className="text-lg leading-8 text-slate-700">
              God loves you and has a wonderful plan for your life. The Bible
              is clear on how anyone can be forgiven of sin and receive the
              free gift of eternal life through Jesus Christ.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-900 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-950">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-indigo-500">
                      {step.verse}
                    </p>
                    <p className="mt-2 leading-7 text-slate-700">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14 rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
              <h2 className="text-xl font-bold text-indigo-950">
                A Prayer of Salvation
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                If you are ready to receive Jesus Christ as your Lord and
                Savior, you can pray this prayer right now:
              </p>
              <p className="mt-4 rounded-xl bg-white p-6 italic leading-7 text-slate-700">
                &ldquo;Lord Jesus, I admit that I am a sinner and I cannot
                save myself. I believe You died on the cross for my sins and
                rose again from the dead. I turn away from my sin and receive
                You now as my Lord and Savior. Thank You for forgiving me and
                giving me eternal life. Help me to follow You from this day
                forward. Amen.&rdquo;
              </p>
              <p className="mt-5 leading-7 text-slate-700">
                If you just prayed this prayer and meant it with your heart,
                the Bible says you are now a child of God. We would love to
                hear from you and walk with you in your new life in Christ.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-block rounded-full bg-indigo-900 px-7 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Tell Us About Your Decision
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
