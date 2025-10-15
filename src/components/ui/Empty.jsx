import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search criteria or browse all listings.", 
  actionLabel = "Browse All Listings",
  onAction,
  icon = "Home"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="btn-primary"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;