import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    closeMobileMenu();
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-2">
                <ApperIcon name="Home" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">HomeScout</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Browse Listings
            </Link>
            <Link
              to="/favorites"
              className="relative text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center"
            >
              <ApperIcon name="Heart" className="w-5 h-5 mr-1" />
              Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              Browse Listings
            </Link>
            <Link
              to="/favorites"
              onClick={closeMobileMenu}
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              <ApperIcon name="Heart" className="w-5 h-5 mr-2" />
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 bg-accent-500 text-white text-xs rounded-full px-2 py-1">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;