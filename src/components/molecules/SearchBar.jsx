import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <ApperIcon 
          name="MapPin" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <Input
          type="text"
          placeholder="Search by city, neighborhood, or zip code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" variant="primary">
        <ApperIcon name="Search" className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;