import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useFavorites } from "@/hooks/useFavorites";
import { PropertyService } from "@/services/api/PropertyService";
import Empty from "@/components/ui/Empty";

const Favorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    loadFavoriteProperties();
  }, [favorites]);

  const loadFavoriteProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (favorites.length === 0) {
        setFavoriteProperties([]);
        setLoading(false);
        return;
      }

      // Get all properties and filter by favorites
      const allProperties = await PropertyService.getAll();
      const favoriteProps = allProperties.filter(property => 
        favorites.includes(property.Id)
      );
      
      setFavoriteProperties(favoriteProps);
    } catch (err) {
      setError("Failed to load favorite properties. Please try again.");
      console.error("Error loading favorite properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseListings = () => {
    navigate("/");
  };

  const handleRetry = () => {
    loadFavoriteProperties();
  };

  if (!loading && favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
          <p className="text-gray-600">Properties you've saved for later</p>
        </div>

        <Empty 
          title="No favorites yet"
          message="Start browsing and save properties you're interested in. They'll appear here for easy access."
          actionLabel="Browse Properties"
          onAction={handleBrowseListings}
          icon="Heart"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={handleBrowseListings}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Search" className="w-5 h-5" />
            Browse More Properties
          </Button>
        </div>
      </div>

      {/* Properties Grid */}
      <PropertyGrid
        properties={favoriteProperties}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        onBrowseAll={handleBrowseListings}
      />
    </div>
  );
};

export default Favorites;