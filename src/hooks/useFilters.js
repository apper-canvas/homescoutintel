import { useState, useEffect } from "react";
import { getFilters, saveFilters, clearFilters } from "@/utils/storage";

const defaultFilters = {
  priceMin: "",
  priceMax: "",
  propertyType: [],
  bedrooms: "",
  bathrooms: "",
  sqftMin: "",
  location: "",
  sortBy: "newest",
};

export const useFilters = () => {
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const savedFilters = getFilters();
    setFilters({ ...defaultFilters, ...savedFilters });
  }, []);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    saveFilters(newFilters);
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    saveFilters(updatedFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    clearFilters();
  };

  const hasActiveFilters = () => {
    return (
      filters.priceMin ||
      filters.priceMax ||
      filters.propertyType.length > 0 ||
      filters.bedrooms ||
      filters.bathrooms ||
      filters.sqftMin ||
      filters.location
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.propertyType.length > 0) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.sqftMin) count++;
    if (filters.location) count++;
    return count;
  };

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    hasActiveFilters: hasActiveFilters(),
    activeFiltersCount: getActiveFiltersCount(),
  };
};