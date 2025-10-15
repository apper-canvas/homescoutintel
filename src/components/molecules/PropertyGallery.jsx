import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const PropertyGallery = ({ images = [], title = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openLightbox}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={openLightbox}
            className="absolute bottom-4 left-4 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2"
          >
            <ApperIcon name="Maximize2" className="w-4 h-4" />
          </Button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? "border-primary-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <img
              src={images[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </Button>

            {/* Navigation in Lightbox */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                >
                  <ApperIcon name="ChevronLeft" className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                >
                  <ApperIcon name="ChevronRight" className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Counter in Lightbox */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded text-sm">
              {currentImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;