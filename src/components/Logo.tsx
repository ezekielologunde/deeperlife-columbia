import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isDark = variant === "dark";
  const sub = isDark ? "text-slate-500" : "text-indigo-200";
  const main = isDark ? "text-indigo-950" : "text-white";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5">
        <Image
          src="/images/logo.jpg"
          alt="Deeper Life Bible Church logo"
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[0.65rem] font-semibold uppercase tracking-[0.32em] ${sub}`}
        >
          Deeper Life
        </span>
        <span className={`text-lg font-bold tracking-tight ${main}`}>
          Bible Church
          <span className={isDark ? "text-amber-600" : "text-amber-300"}>
            {" "}
            Columbia
          </span>
        </span>
      </span>
    </span>
  );
}
