import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import PropertyFilters from "@/components/organisms/PropertyFilters";
import FilterPanel from "@/components/molecules/FilterPanel";
import { useFilters } from "@/hooks/useFilters";
import { PropertyService } from "@/services/api/PropertyService";

const BrowseListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filters, updateFilter, resetFilters } = useFilters();
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];

    // Apply price filter
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax));
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyType.includes(property.propertyType)
      );
    }

    // Apply bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => 
        property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    // Apply bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(property => 
        property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    // Apply sqft filter
    if (filters.sqftMin) {
      filtered = filtered.filter(property => 
        property.sqft >= parseInt(filters.sqftMin)
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(locationLower) ||
        property.state.toLowerCase().includes(locationLower) ||
        property.zipCode.includes(filters.location) ||
        property.address.toLowerCase().includes(locationLower)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "sqft-high":
        filtered.sort((a, b) => b.sqft - a.sqft);
        break;
      case "sqft-low":
        filtered.sort((a, b) => a.sqft - b.sqft);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
        break;
    }

    return filtered;
  }, [properties, filters]);

  const handleSortChange = (sortValue) => {
    updateFilter("sortBy", sortValue);
  };

  const handleBrowseAll = () => {
    resetFilters();
  };

  const handleRetry = () => {
    loadProperties();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
            isOpen={true}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters Header */}
          <PropertyFilters
            filters={filters}
            onFilterChange={updateFilter}
            onSortChange={handleSortChange}
            onReset={resetFilters}
            resultsCount={filteredAndSortedProperties.length}
          />

          {/* Properties Grid */}
          <PropertyGrid
            properties={filteredAndSortedProperties}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onBrowseAll={handleBrowseAll}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseListings;