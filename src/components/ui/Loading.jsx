import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-card overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="skeleton-image h-48 bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-6">
            {/* Price skeleton */}
            <div className="skeleton-title w-24 bg-gray-200 mb-3"></div>
            
            {/* Address skeleton */}
            <div className="skeleton-text w-full bg-gray-200 mb-4"></div>
            
            {/* Property details skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="skeleton-text w-20 bg-gray-200"></div>
              <div className="skeleton-text w-16 bg-gray-200"></div>
            </div>
            
            {/* Additional details skeleton */}
            <div className="space-y-2">
              <div className="skeleton-text w-32 bg-gray-200"></div>
              <div className="skeleton-text w-28 bg-gray-200"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="mt-4">
              <div className="skeleton h-10 w-full bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;