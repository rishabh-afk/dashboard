const SkeletonLoader: React.FC = () => {
  return (
    <div className="overflow-hidden border border-gray-200">
      {/* Table Header Skeleton */}
      <div className="bg-gray-300 animate-pulse h-full rounded-t-lg p-4 flex gap-5">
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
      </div>
      <div className="bg-gray-300 animate-pulse h-full mt-4 rounded-t-lg p-4 flex gap-5">
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
        <div className="w-1/4 h-10 rounded bg-gray-200"></div>
      </div>
      {/* Table Body Skeleton */}
      <div className="flex flex-col px-4 py-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex gap-3 items-center pt-3">
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-10 rounded bg-gray-300 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
