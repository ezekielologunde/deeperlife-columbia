export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-4">
      <span className="h-px w-10 bg-white/15" />
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
        {children}
      </span>
      <span className="h-px w-10 bg-white/15" />
    </div>
  );
}
