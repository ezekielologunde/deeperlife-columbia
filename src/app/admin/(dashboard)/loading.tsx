export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-48 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-72 rounded bg-slate-100" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
