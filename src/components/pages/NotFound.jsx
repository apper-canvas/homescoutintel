import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Home" className="w-12 h-12 text-primary-600" />
          </div>
          
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the property you're looking for doesn't exist or may have been removed from our listings.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="primary"
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2"
          >
            <ApperIcon name="Search" className="w-5 h-5" />
            Browse All Properties
          </Button>
          
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help finding the right property?{" "}
            <button
              onClick={handleGoHome}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Start browsing our listings
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;