import React from "react";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterPanel = ({ filters, onFilterChange, onReset, isOpen, onToggle }) => {
  const propertyTypes = [
    { value: "single-family", label: "Single Family" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "apartment", label: "Apartment" },
    { value: "multi-family", label: "Multi-Family" },
    { value: "land", label: "Land" },
    { value: "commercial", label: "Commercial" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
  ];

  const bathroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
  ];

  const handlePropertyTypeChange = (type) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type];
    onFilterChange("propertyType", newTypes);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2"
        >
          <ApperIcon name="Filter" className="w-5 h-5" />
          Filters
          {filters.propertyType.length + (filters.priceMin ? 1 : 0) + (filters.bedrooms ? 1 : 0) + (filters.bathrooms ? 1 : 0) + (filters.sqftMin ? 1 : 0) > 0 && (
            <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
              {filters.propertyType.length + (filters.priceMin ? 1 : 0) + (filters.bedrooms ? 1 : 0) + (filters.bathrooms ? 1 : 0) + (filters.sqftMin ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        lg:block
        ${isOpen ? "block" : "hidden"}
        bg-white rounded-lg shadow-card p-6 lg:sticky lg:top-6
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-sm"
          >
            Reset All
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => onFilterChange("priceMin", e.target.value)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => onFilterChange("priceMax", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="mb-6">
          <Label>Property Type</Label>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <label key={type.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.propertyType.includes(type.value)}
                  onChange={() => handlePropertyTypeChange(type.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <Label>Bedrooms</Label>
          <Select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange("bedrooms", e.target.value)}
          >
            {bedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="mb-6">
          <Label>Bathrooms</Label>
          <Select
            value={filters.bathrooms}
            onChange={(e) => onFilterChange("bathrooms", e.target.value)}
          >
            {bathroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Square Footage */}
        <div className="mb-6">
          <Label>Minimum Square Footage</Label>
          <Input
            type="number"
            placeholder="Min Sqft"
            value={filters.sqftMin}
            onChange={(e) => onFilterChange("sqftMin", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <Label>Location</Label>
          <Input
            type="text"
            placeholder="City, State, or Zip"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
          />
        </div>

        {/* Mobile Close Button */}
        <div className="lg:hidden">
          <Button
            variant="primary"
            onClick={onToggle}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;