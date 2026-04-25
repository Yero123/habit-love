export function HabitCardSkeleton() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--color-glass-bg)",
        border: "0.5px solid var(--color-glass-bd)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg shimmer" />
        <div className="flex-1">
          <div className="h-4 w-24 rounded shimmer mb-1" />
          <div className="h-3 w-16 rounded shimmer" />
        </div>
        <div className="w-7 h-7 rounded-lg shimmer" />
      </div>

      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: "repeat(13, 1fr)",
          marginBottom: "12px",
        }}
      >
        {Array.from({ length: 91 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm shimmer"
            style={{}}
          />
        ))}
      </div>

      <div className="h-3 w-28 rounded shimmer" />
    </div>
  );
}