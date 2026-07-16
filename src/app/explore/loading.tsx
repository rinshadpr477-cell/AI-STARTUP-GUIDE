export default function Loading() {
  return (
    <div className="w-full animate-pulse px-10 py-16">
      <div className="h-8 w-64 rounded bg-secondary" />
      <div className="mt-3 h-4 w-96 max-w-full rounded bg-secondary" />
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 rounded-lg border border-border bg-card" />
        ))}
      </div>
    </div>
  );
}