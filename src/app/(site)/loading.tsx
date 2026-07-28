export default function SiteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-900" />
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  );
}
