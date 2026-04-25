export function TabsSkeleton() {
  return (
    <div className="flex gap-2 pb-4" style={{ padding: "4px 2px 18px" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-14 rounded-2xl shimmer"
          style={{
            flex: i === 1 ? "0 0 auto" : "1",
            minWidth: i === 1 ? "auto" : "52px",
            padding: i === 1 ? "10px 16px" : "10px 14px",
          }}
        />
      ))}
    </div>
  );
}