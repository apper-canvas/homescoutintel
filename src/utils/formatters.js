export const formatPrice = (price) => {
  if (!price) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatAddress = (property) => {
  if (!property) return "";
  const { address, city, state, zipCode } = property;
  return `${address}, ${city}, ${state} ${zipCode}`;
};

export const formatShortAddress = (property) => {
  if (!property) return "";
  const { city, state } = property;
  return `${city}, ${state}`;
};

export const getBedBathText = (bedrooms, bathrooms) => {
  const bedText = bedrooms === 1 ? "1 bed" : `${bedrooms} beds`;
  const bathText = bathrooms === 1 ? "1 bath" : `${bathrooms} baths`;
  return `${bedText}, ${bathText}`;
};

export const getPropertyTypeLabel = (type) => {
  const typeMap = {
    "single-family": "Single Family",
    "condo": "Condo",
    "townhouse": "Townhouse",
    "apartment": "Apartment",
    "multi-family": "Multi-Family",
    "land": "Land",
    "commercial": "Commercial",
  };
  return typeMap[type] || type;
};