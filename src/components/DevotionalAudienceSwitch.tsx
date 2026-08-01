import Link from "next/link";

const AUDIENCES = [
  { href: "/devotional", label: "Adult" },
  { href: "/devotional/youth", label: "Youth" },
  { href: "/devotional/children", label: "Children" },
];

export default function DevotionalAudienceSwitch({
  active,
}: {
  active: "Adult" | "Youth" | "Children";
}) {
  return (
    <div className="mx-auto mb-10 flex w-fit gap-1 rounded-full bg-slate-100 p-1.5">
      {AUDIENCES.map((a) => (
        <Link
          key={a.href}
          href={a.href}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            a.label === active
              ? "bg-white text-indigo-900 shadow-sm"
              : "text-slate-600 hover:text-indigo-900"
          }`}
        >
          {a.label}
        </Link>
      ))}
    </div>
  );
}
