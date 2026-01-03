import React from "react";

const MovieDetailsSkeleton = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 blur-3xl opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
          
          {/* Poster Skeleton */}
          <div className="h-[520px] rounded-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 shimmer" />

          {/* Content Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="h-10 w-3/4 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 shimmer" />

            {/* Meta badges */}
            <div className="flex gap-3 flex-wrap">
              <div className="h-7 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-7 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-7 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-10/12 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <div className="h-11 w-36 rounded-lg bg-gray-300 dark:bg-gray-700" />
              <div className="h-11 w-48 rounded-lg bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* shimmer animation */}
      <style>
        {`
          .shimmer {
            background-size: 200% 100%;
            animation: shimmer 1.6s infinite linear;
          }
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default MovieDetailsSkeleton;
