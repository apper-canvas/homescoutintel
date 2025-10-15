import React, { useState } from "react";
import FilterPanel from "@/components/molecules/FilterPanel";
import SortOptions from "@/components/molecules/SortOptions";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PropertyFilters = ({ 
  filters, 
  onFilterChange, 
  onSortChange,
  onReset,
  resultsCount = 0
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const getActiveFiltersDisplay = () => {
    const activeFilters = [];
    
    if (filters.priceMin || filters.priceMax) {
      const minPrice = filters.priceMin ? `$${parseInt(filters.priceMin).toLocaleString()}` : "$0";
      const maxPrice = filters.priceMax ? `$${parseInt(filters.priceMax).toLocaleString()}` : "Any";
      activeFilters.push(`Price: ${minPrice} - ${maxPrice}`);
    }
    
    if (filters.propertyType && filters.propertyType.length > 0) {
      activeFilters.push(`Type: ${filters.propertyType.length} selected`);
    }
    
    if (filters.bedrooms) {
      activeFilters.push(`${filters.bedrooms}+ beds`);
    }
    
    if (filters.bathrooms) {
      activeFilters.push(`${filters.bathrooms}+ baths`);
    }
    
    if (filters.sqftMin) {
      activeFilters.push(`${parseInt(filters.sqftMin).toLocaleString()}+ sqft`);
    }
    
    if (filters.location) {
      activeFilters.push(`Location: ${filters.location}`);
    }
    
    return activeFilters;
  };

  const activeFiltersDisplay = getActiveFiltersDisplay();

  return (
    <div className="space-y-6">
      {/* Results Header & Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {resultsCount.toLocaleString()} Properties Found
          </h2>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilterPanel}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Filter" className="w-4 h-4" />
              Filters
              {activeFiltersDisplay.length > 0 && (
                <Badge variant="accent" className="ml-1">
                  {activeFiltersDisplay.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        <SortOptions
          value={filters.sortBy}
          onChange={(value) => onSortChange(value)}
          className="flex-shrink-0"
        />
      </div>

      {/* Active Filters */}
      {activeFiltersDisplay.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Active filters:</span>
          {activeFiltersDisplay.map((filter, index) => (
            <Badge key={index} variant="primary" className="text-sm">
              {filter}
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel Component */}
      <div className="lg:hidden">
        <FilterPanel
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onReset}
          isOpen={isFilterPanelOpen}
          onToggle={toggleFilterPanel}
        />
      </div>
    </div>
  );
};

export default PropertyFilters;