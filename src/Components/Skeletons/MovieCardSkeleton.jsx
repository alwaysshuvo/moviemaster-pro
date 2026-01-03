import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-base-200 shadow-md">
      {/* Image */}
      <div className="h-72 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
