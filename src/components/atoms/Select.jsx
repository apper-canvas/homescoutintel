import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 bg-white appearance-none pr-10",
          error 
            ? "border-error focus:ring-error" 
            : "border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;