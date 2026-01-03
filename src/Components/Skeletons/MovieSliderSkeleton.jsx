import React from "react";

const MovieSliderSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden shadow-md bg-gradient-to-br 
      from-gray-200/40 via-gray-100/30 to-gray-200/50 
      dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/60"
    >
      {/* Image */}
      <div className="h-72 bg-gray-300 dark:bg-gray-700" />

      {/* Overlay text */}
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default MovieSliderSkeleton;
