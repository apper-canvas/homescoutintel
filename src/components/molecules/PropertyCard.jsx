import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { formatPrice, formatShortAddress, getBedBathText, getPropertyTypeLabel } from "@/utils/formatters";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "react-toastify";

const PropertyCard = ({ property }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasAdded = toggleFavorite(property.Id);
    if (wasAdded) {
      toast.success("Added to favorites!");
    } else {
      toast.info("Removed from favorites");
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const primaryImage = property.images && property.images.length > 0 ? property.images[0] : null;

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden card-hover">
      <Link to={`/property/${property.Id}`} className="block">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <ApperIcon name="Image" className="w-8 h-8 text-gray-400" />
            </div>
          )}
          
          {primaryImage && !imageError ? (
            <img
              src={primaryImage}
              alt={property.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ApperIcon name="Home" className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Property Status Badge */}
          {property.status && (
            <div className="absolute top-3 left-3">
              <Badge 
                variant={property.status === "For Sale" ? "accent" : "primary"}
                className="text-xs font-semibold"
              >
                {property.status}
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite(property.Id)
                ? "bg-accent-500 text-white animate-pulse-heart"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-accent-500"
            }`}
          >
            <ApperIcon 
              name={isFavorite(property.Id) ? "Heart" : "Heart"} 
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite(property.Id) ? "fill-current" : ""
              }`}
            />
          </button>

          {/* Image Count */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <ApperIcon name="Camera" className="w-3 h-3" />
              {property.images.length}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-6">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900 gradient-text">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Address */}
          <p className="text-gray-600 mb-3 line-clamp-1">
            {formatShortAddress(property)}
          </p>

          {/* Property Type */}
          <div className="mb-3">
            <Badge variant="default" className="text-xs">
              {getPropertyTypeLabel(property.propertyType)}
            </Badge>
          </div>

          {/* Beds & Baths */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <ApperIcon name="Bed" className="w-4 h-4" />
              {getBedBathText(property.bedrooms, property.bathrooms)}
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Maximize" className="w-4 h-4" />
              {property.sqft ? `${property.sqft.toLocaleString()} sqft` : "N/A"}
            </span>
          </div>

          {/* Additional Info */}
          <div className="space-y-1 text-sm text-gray-500">
            {property.yearBuilt && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                Built in {property.yearBuilt}
              </div>
            )}
            {property.lotSize && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Square" className="w-4 h-4" />
                {property.lotSize.toLocaleString()} sqft lot
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/property/${property.Id}`}>
            View Details
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;