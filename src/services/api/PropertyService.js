import propertyData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const PropertyService = {
  async getAll() {
    await delay(300);
    return [...propertyData];
  },

  async getById(id) {
    await delay(200);
    const property = propertyData.find(p => p.Id === id);
    if (!property) {
      throw new Error("Property not found");
    }
    return { ...property };
  },

  async create(property) {
    await delay(400);
    const maxId = Math.max(...propertyData.map(p => p.Id));
    const newProperty = {
      ...property,
      Id: maxId + 1,
      listingDate: new Date().toISOString(),
    };
    propertyData.push(newProperty);
    return { ...newProperty };
  },

  async update(id, updates) {
    await delay(300);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    propertyData[index] = { ...propertyData[index], ...updates };
    return { ...propertyData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    const deleted = propertyData.splice(index, 1)[0];
    return { ...deleted };
  },

  async search(query) {
    await delay(300);
    const queryLower = query.toLowerCase();
    const filtered = propertyData.filter(property => 
      property.city.toLowerCase().includes(queryLower) ||
      property.state.toLowerCase().includes(queryLower) ||
      property.zipCode.includes(query) ||
      property.address.toLowerCase().includes(queryLower) ||
      property.title.toLowerCase().includes(queryLower)
    );
    return [...filtered];
  },

  async getByFilters(filters) {
    await delay(350);
    let filtered = [...propertyData];

    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= filters.priceMin);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= filters.priceMax);
    }
    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(p => filters.propertyType.includes(p.propertyType));
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
    }
    if (filters.sqftMin) {
      filtered = filtered.filter(p => p.sqft >= filters.sqftMin);
    }
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(locationLower) ||
        p.state.toLowerCase().includes(locationLower) ||
        p.zipCode.includes(filters.location)
      );
    }

    return filtered;
  }
};