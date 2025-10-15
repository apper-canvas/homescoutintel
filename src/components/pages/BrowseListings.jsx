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
      filtered = filtered.filter(property => property.price_c >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price_c <= parseInt(filters.priceMax));
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyType.includes(property.property_type_c)
      );
    }

    // Apply bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => 
        property.bedrooms_c >= parseInt(filters.bedrooms)
      );
    }

    // Apply bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(property => 
        property.bathrooms_c >= parseInt(filters.bathrooms)
      );
    }

    // Apply sqft filter
    if (filters.sqftMin) {
      filtered = filtered.filter(property => 
        property.sqft_c >= parseInt(filters.sqftMin)
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(property => 
        property.city_c?.toLowerCase().includes(locationLower) ||
        property.state_c?.toLowerCase().includes(locationLower) ||
        property.zip_code_c?.includes(filters.location) ||
        property.address_c?.toLowerCase().includes(locationLower)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price_c || 0) - (b.price_c || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price_c || 0) - (a.price_c || 0));
        break;
      case "sqft-high":
        filtered.sort((a, b) => (b.sqft_c || 0) - (a.sqft_c || 0));
        break;
      case "sqft-low":
        filtered.sort((a, b) => (a.sqft_c || 0) - (b.sqft_c || 0));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.listing_date_c || 0) - new Date(a.listing_date_c || 0));
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