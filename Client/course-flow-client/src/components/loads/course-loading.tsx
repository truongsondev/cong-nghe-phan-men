import { Skeleton } from "@/components/ui/skeleton";

function CourseLoading() {
  return (
    <div className="flex flex-col items-start justify-start w-[200px] xs:w-[270px] bg-[#FDFBF9] rounded-t-[15px] overflow-hidden">
      <Skeleton className="w-full h-[150px] rounded-t-[10px] bg-stone-400" />

      <div className="flex flex-col gap-2 w-full px-2 py-3">
        <Skeleton className="h-5 w-3/4 bg-stone-400" />
        <Skeleton className="h-4 w-1/2 bg-stone-400" />
        <Skeleton className="h-4 w-full bg-stone-400" />
        <Skeleton className="h-4 w-full bg-stone-400" />

        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-[70px] bg-stone-400" />
          <Skeleton className="h-5 w-[60px] bg-stone-400" />
        </div>
      </div>
    </div>
  );
}

export default CourseLoading;
