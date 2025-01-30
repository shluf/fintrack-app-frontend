import { Skeleton } from "@/components/ui/skeleton";

const BudgetSkeleton = () => {
  return (
    <div className="space-y-6 md:pb-4 pb-[120px]">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-[80px] rounded-lg" />
            </div>
            <Skeleton className="h-7 w-full rounded-lg" />
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6 border">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-4 w-[100px] rounded-lg" />
          <Skeleton className="h-4 w-[80px] rounded-lg" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <div className="rounded-xl p-6 border space-y-4">
        <Skeleton className="h-6 w-[200px] rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
