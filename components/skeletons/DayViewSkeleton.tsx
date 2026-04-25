export function DayViewSkeleton() {
  return (
    <div>
      <div className="mb-6">
        <div className="h-3 w-20 rounded shimmer mb-2" />
        <div className="h-8 w-40 rounded shimmer mb-2" />
        <div className="h-4 w-32 rounded shimmer" />
      </div>

      <div className="mb-6">
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-2 shimmer"
          style={{
            background: "var(--color-p-card-bg)",
            border: "1px solid var(--color-p-card-bd)",
          }}
        >
          <div className="w-7 h-7 rounded-full shimmer" />
          <div className="h-4 w-20 rounded shimmer" />
          <div className="ml-auto h-3 w-16 rounded shimmer" />
        </div>

        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl mb-2"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="w-7 h-7 rounded-lg shimmer" />
            <div className="flex-1">
              <div className="h-4 w-28 rounded shimmer mb-1" />
              <div className="h-3 w-20 rounded shimmer" />
            </div>
            <div className="w-16 h-6 rounded-full shimmer" />
          </div>
        ))}
      </div>

      <div>
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-2 shimmer"
          style={{
            background: "var(--color-g-card-bg)",
            border: "1px solid var(--color-g-card-bd)",
          }}
        >
          <div className="w-7 h-7 rounded-full shimmer" />
          <div className="h-4 w-20 rounded shimmer" />
          <div className="ml-auto h-3 w-16 rounded shimmer" />
        </div>

        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl mb-2"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="w-7 h-7 rounded-lg shimmer" />
            <div className="flex-1">
              <div className="h-4 w-28 rounded shimmer mb-1" />
              <div className="h-3 w-20 rounded shimmer" />
            </div>
            <div className="w-16 h-6 rounded-full shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}