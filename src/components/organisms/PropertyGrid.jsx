import React from "react";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null, 
  onRetry,
  onBrowseAll 
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty 
        title="No properties found"
        message="Try adjusting your search criteria or browse all listings."
        actionLabel="Browse All Listings"
        onAction={onBrowseAll}
        icon="Home"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.Id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;