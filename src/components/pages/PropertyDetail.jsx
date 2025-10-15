import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import PropertyGallery from "@/components/molecules/PropertyGallery";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { PropertyService } from "@/services/api/PropertyService";
import { useFavorites } from "@/hooks/useFavorites";
import { formatPrice, formatAddress, getPropertyTypeLabel, formatDate } from "@/utils/formatters";
import { toast } from "react-toastify";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      setError("Property not found or failed to load.");
      console.error("Error loading property:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    const wasAdded = toggleFavorite(property.Id);
    if (wasAdded) {
      toast.success("Added to favorites!");
    } else {
      toast.info("Removed from favorites");
    }
  };

  const handleBackToListings = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBackToListings}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          Back to Listings
        </Button>
      </div>

      {/* Property Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
{property.Name}
            </h1>
            <p className="text-xl text-gray-600 mb-4 flex items-center">
              {formatAddress(property)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">
                {getPropertyTypeLabel(property.property_type_c)}
              </Badge>
              <Badge variant={property.status_c === "For Sale" ? "accent" : "default"}>
                {property.status_c}
              </Badge>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
{formatPrice(property.price_c)}
            </div>
            <p className="text-gray-600">Listed {formatDate(property.listing_date_c)}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery Column */}
        <div className="lg:col-span-2">
<PropertyGallery images={property.images_c} title={property.Name} />
        </div>

        {/* Property Details Column */}
        <div className="space-y-6">
          {/* Key Details Card */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <ApperIcon name="Bed" className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Bedrooms</span>
              </div>
<div className="text-right font-medium">{property.bedrooms_c}</div>
              
              <div className="flex items-center gap-2">
                <ApperIcon name="Bath" className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Bathrooms</span>
              </div>
              <div className="text-right font-medium">{property.bathrooms_c}</div>
              
              <div className="flex items-center gap-2">
                <ApperIcon name="Maximize" className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Square Feet</span>
              </div>
              <div className="text-right font-medium">{property.sqft_c?.toLocaleString()}</div>
              
              {property.lot_size_c && (
                <>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Square" className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Lot Size</span>
                  </div>
                  <div className="text-right font-medium">{property.lot_size_c.toLocaleString()} sqft</div>
                </>
              )}
              
              {property.year_built_c && (
                <>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Calendar" className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Year Built</span>
                  </div>
                  <div className="text-right font-medium">{property.year_built_c}</div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-card p-6 space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => toast.info("Contact feature coming soon!")}
            >
              <ApperIcon name="Phone" className="w-5 h-5 mr-2" />
              Contact Agent
            </Button>
            
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleFavoriteToggle}
            >
              <ApperIcon 
                name="Heart" 
                className={`w-5 h-5 mr-2 ${isFavorite(property.Id) ? "fill-current text-accent-500" : ""}`} 
              />
              {isFavorite(property.Id) ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast.info("Schedule tour feature coming soon!")}
            >
              <ApperIcon name="Calendar" className="w-5 h-5 mr-2" />
              Schedule Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Description Section */}
{property.description_c && (
        <div className="mt-8 bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {property.description_c}
          </p>
        </div>
      )}

      {/* Amenities Section */}
{property.amenities_c && property.amenities_c.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.amenities_c.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <ApperIcon name="Check" className="w-5 h-5 text-success" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;