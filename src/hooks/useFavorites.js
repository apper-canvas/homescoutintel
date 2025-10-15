import { useState, useEffect } from "react";
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite } from "@/utils/storage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (propertyId) => {
    if (isFavorite(propertyId)) {
      const newFavorites = removeFromFavorites(propertyId);
      setFavorites(newFavorites);
      return false;
    } else {
      const newFavorites = addToFavorites(propertyId);
      setFavorites(newFavorites);
      return true;
    }
  };

  const checkIsFavorite = (propertyId) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: checkIsFavorite,
    favoritesCount: favorites.length,
  };
};