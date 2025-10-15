export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatAddress = (property) => {
  return `${property.address_c}, ${property.city_c}, ${property.state_c} ${property.zip_code_c}`;
};

export const formatShortAddress = (property) => {
  return `${property.city_c}, ${property.state_c} ${property.zip_code_c}`;
};

export const getPropertyTypeLabel = (type) => {
  const labels = {
    'single-family': 'Single Family',
    'House': 'House',
    'condo': 'Condo',
    'Condo': 'Condo',
    'townhouse': 'Townhouse',
    'Townhouse': 'Townhouse',
    'Apartment': 'Apartment',
    'multi-family': 'Multi Family',
    'land': 'Land',
    'Land': 'Land',
    'commercial': 'Commercial',
    'Other': 'Other',
  };
  return labels[type] || type;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else {
return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

export const getBedBathText = (bedrooms, bathrooms) => {
  return `${bedrooms} bed, ${bathrooms} bath`;
};