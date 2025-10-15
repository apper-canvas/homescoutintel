import React from "react";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";

const SortOptions = ({ value, onChange, className = "" }) => {
  const sortOptions = [
    { value: "newest", label: "Newest Listings" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "sqft-high", label: "Square Footage: Largest" },
    { value: "sqft-low", label: "Square Footage: Smallest" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Label className="mb-0 whitespace-nowrap">Sort by:</Label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-48"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SortOptions;