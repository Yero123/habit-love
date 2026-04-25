import { Suspense } from "react";
import { HabitBoard } from "../components/HabitBoard";
import { TabsSkeleton } from "../components/skeletons/TabsSkeleton";
import { HabitCardSkeleton } from "../components/skeletons/HabitCardSkeleton";
import { Logo } from "../src/components/Logo";

function HomeContent() {
  return (
    <div>
      <div className="flex items-center justify-between px-1 pb-3" style={{ padding: "4px 4px 14px" }}>
        <Logo size={28} showText={true} />
      </div>

      <Suspense fallback={<SkeletonFallback />}>
        <HabitBoard />
      </Suspense>
    </div>
  );
}

function SkeletonFallback() {
  return (
    <div>
      <TabsSkeleton />
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-2.5">
          <HabitCardSkeleton />
          <HabitCardSkeleton />
        </div>
        <div className="flex flex-col gap-2.5">
          <HabitCardSkeleton />
          <HabitCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <HomeContent />;
}