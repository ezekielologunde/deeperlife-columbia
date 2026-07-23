type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isDark = variant === "dark";
  const ink = isDark ? "#1e1b4b" : "#ffffff";
  const accent = isDark ? "#c7a052" : "#e7c98a";
  const sub = isDark ? "text-slate-500" : "text-indigo-200";
  const main = isDark ? "text-indigo-950" : "text-white";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20 3C11.72 3 5 9.72 5 18c0 8.837 6.716 15.972 15 18.882V37h0.001C28.29 34.15 35 27 35 18 35 9.72 28.28 3 20 3Z"
          fill={ink}
        />
        <path
          d="M20 9c-3.6 4.2-5.4 7.6-5.4 10.6 0 3 2.4 5.4 5.4 5.4s5.4-2.4 5.4-5.4c0-3-1.8-6.4-5.4-10.6Z"
          fill={accent}
        />
        <path d="M13 28h14" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
      </svg>

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
