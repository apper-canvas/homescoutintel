export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem("homescout_favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem("homescout_favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

export const addToFavorites = (propertyId) => {
  const favorites = getFavorites();
  if (!favorites.includes(propertyId)) {
    const newFavorites = [...favorites, propertyId];
    saveFavorites(newFavorites);
    return newFavorites;
  }
  return favorites;
};

export const removeFromFavorites = (propertyId) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(id => id !== propertyId);
  saveFavorites(newFavorites);
  return newFavorites;
};

export const isFavorite = (propertyId) => {
  const favorites = getFavorites();
  return favorites.includes(propertyId);
};

export const getFilters = () => {
  try {
    const filters = sessionStorage.getItem("homescout_filters");
    return filters ? JSON.parse(filters) : {};
  } catch (error) {
    console.error("Error loading filters:", error);
    return {};
  }
};

export const saveFilters = (filters) => {
  try {
    sessionStorage.setItem("homescout_filters", JSON.stringify(filters));
  } catch (error) {
    console.error("Error saving filters:", error);
  }
};

export const clearFilters = () => {
  try {
    sessionStorage.removeItem("homescout_filters");
  } catch (error) {
    console.error("Error clearing filters:", error);
  }
};