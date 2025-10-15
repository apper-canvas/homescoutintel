import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import PropertyFilters from "@/components/organisms/PropertyFilters";
import FilterPanel from "@/components/molecules/FilterPanel";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useFilters } from "@/hooks/useFilters";
import { PropertyService } from "@/services/api/PropertyService";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filters, updateFilter, updateFilters, resetFilters } = useFilters();
  const navigate = useNavigate();
  
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    // Update search query in filters when URL changes
    if (searchQuery !== filters.location) {
      updateFilter("location", searchQuery);
    }
  }, [searchQuery]);

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

    // Apply search query first
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(queryLower) ||
        property.state.toLowerCase().includes(queryLower) ||
        property.zipCode.includes(searchQuery) ||
        property.address.toLowerCase().includes(queryLower) ||
        property.title.toLowerCase().includes(queryLower)
      );
    }

    // Apply other filters
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax));
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyType.includes(property.propertyType)
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => 
        property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(property => 
        property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    if (filters.sqftMin) {
      filtered = filtered.filter(property => 
        property.sqft >= parseInt(filters.sqftMin)
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
  }, [properties, searchQuery, filters]);

  const handleNewSearch = (newSearchTerm) => {
    setSearchParams({ q: newSearchTerm });
  };

  const handleSortChange = (sortValue) => {
    updateFilter("sortBy", sortValue);
  };

  const handleBrowseAll = () => {
    navigate("/");
  };

  const handleRetry = () => {
    loadProperties();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            {searchQuery && (
              <p className="text-gray-600">
                Showing results for "{searchQuery}"
              </p>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={handleBrowseAll}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Browse All Properties
          </Button>
        </div>

        {/* New Search Bar */}
        <div className="max-w-2xl">
          <SearchBar onSearch={handleNewSearch} />
        </div>
      </div>

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

export default SearchResults;