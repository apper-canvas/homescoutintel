import { getApperClient } from "@/services/apperClient";
import React from "react";
import Error from "@/components/ui/Error";

const parseJsonField = (value) => {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const transformPropertyFromDb = (dbProperty) => {
  return {
    Id: dbProperty.Id,
    Name: dbProperty.Name,
    Tags: dbProperty.Tags,
    price_c: dbProperty.price_c,
    address_c: dbProperty.address_c,
    city_c: dbProperty.city_c,
    state_c: dbProperty.state_c,
    zip_code_c: dbProperty.zip_code_c,
    property_type_c: dbProperty.property_type_c,
    bedrooms_c: dbProperty.bedrooms_c,
    bathrooms_c: dbProperty.bathrooms_c,
    sqft_c: dbProperty.sqft_c,
    lot_size_c: dbProperty.lot_size_c,
    year_built_c: dbProperty.year_built_c,
    description_c: dbProperty.description_c,
    images_c: parseJsonField(dbProperty.images_c),
    amenities_c: parseJsonField(dbProperty.amenities_c),
    listing_date_c: dbProperty.listing_date_c,
    status_c: dbProperty.status_c,
    latitude_c: dbProperty.latitude_c,
    longitude_c: dbProperty.longitude_c,
    Owner: dbProperty.Owner,
    CreatedOn: dbProperty.CreatedOn,
    CreatedBy: dbProperty.CreatedBy,
    ModifiedOn: dbProperty.ModifiedOn,
    ModifiedBy: dbProperty.ModifiedBy,
  };
};

export const PropertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "sqft_c" } },
          { field: { Name: "lot_size_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
        orderBy: [{ fieldName: "listing_date_c", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 },
      };

      const response = await apperClient.fetchRecords("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(transformPropertyFromDb);
    } catch (error) {
      console.error("Error fetching properties:", error?.message || error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "sqft_c" } },
          { field: { Name: "lot_size_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
        ],
      };

      const response = await apperClient.getRecordById("property_c", id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message || "Property not found");
      }

      if (!response.data) {
        throw new Error("Property not found");
      }

      return transformPropertyFromDb(response.data);
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.message || error);
      throw error;
    }
  },

  async create(property) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        records: [
          {
            Name: property.Name,
            Tags: property.Tags || "",
            price_c: parseFloat(property.price_c),
            address_c: property.address_c,
            city_c: property.city_c,
            state_c: property.state_c,
            zip_code_c: property.zip_code_c,
            property_type_c: property.property_type_c,
            bedrooms_c: parseInt(property.bedrooms_c),
            bathrooms_c: parseFloat(property.bathrooms_c),
            sqft_c: parseInt(property.sqft_c),
            lot_size_c: property.lot_size_c ? parseInt(property.lot_size_c) : null,
            year_built_c: property.year_built_c ? parseInt(property.year_built_c) : null,
            description_c: property.description_c || "",
            images_c: property.images_c ? JSON.stringify(property.images_c) : "[]",
            amenities_c: property.amenities_c ? JSON.stringify(property.amenities_c) : "[]",
            listing_date_c: property.listing_date_c || new Date().toISOString(),
            status_c: property.status_c || "For Sale",
            latitude_c: property.latitude_c ? parseFloat(property.latitude_c) : null,
            longitude_c: property.longitude_c ? parseFloat(property.longitude_c) : null,
          },
        ],
      };

      const response = await apperClient.createRecord("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return transformPropertyFromDb(result.data);
        } else {
          console.error("Failed to create property:", result.message);
          throw new Error(result.message || "Failed to create property");
        }
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error("Error creating property:", error?.message || error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const updateData = { Id: id };
      if (updates.Name !== undefined) updateData.Name = updates.Name;
      if (updates.Tags !== undefined) updateData.Tags = updates.Tags;
      if (updates.price_c !== undefined) updateData.price_c = parseFloat(updates.price_c);
      if (updates.address_c !== undefined) updateData.address_c = updates.address_c;
      if (updates.city_c !== undefined) updateData.city_c = updates.city_c;
      if (updates.state_c !== undefined) updateData.state_c = updates.state_c;
      if (updates.zip_code_c !== undefined) updateData.zip_code_c = updates.zip_code_c;
      if (updates.property_type_c !== undefined) updateData.property_type_c = updates.property_type_c;
      if (updates.bedrooms_c !== undefined) updateData.bedrooms_c = parseInt(updates.bedrooms_c);
      if (updates.bathrooms_c !== undefined) updateData.bathrooms_c = parseFloat(updates.bathrooms_c);
      if (updates.sqft_c !== undefined) updateData.sqft_c = parseInt(updates.sqft_c);
      if (updates.lot_size_c !== undefined) updateData.lot_size_c = updates.lot_size_c ? parseInt(updates.lot_size_c) : null;
      if (updates.year_built_c !== undefined) updateData.year_built_c = updates.year_built_c ? parseInt(updates.year_built_c) : null;
      if (updates.description_c !== undefined) updateData.description_c = updates.description_c;
      if (updates.images_c !== undefined) updateData.images_c = JSON.stringify(updates.images_c);
      if (updates.amenities_c !== undefined) updateData.amenities_c = JSON.stringify(updates.amenities_c);
      if (updates.listing_date_c !== undefined) updateData.listing_date_c = updates.listing_date_c;
      if (updates.status_c !== undefined) updateData.status_c = updates.status_c;
      if (updates.latitude_c !== undefined) updateData.latitude_c = updates.latitude_c ? parseFloat(updates.latitude_c) : null;
      if (updates.longitude_c !== undefined) updateData.longitude_c = updates.longitude_c ? parseFloat(updates.longitude_c) : null;

      const params = { records: [updateData] };

      const response = await apperClient.updateRecord("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return transformPropertyFromDb(result.data);
        } else {
          console.error("Failed to update property:", result.message);
          throw new Error(result.message || "Failed to update property");
        }
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error(`Error updating property ${id}:`, error?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = { RecordIds: [id] };
      const response = await apperClient.deleteRecord("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          console.error("Failed to delete property:", result.message);
          throw new Error(result.message || "Failed to delete property");
        }
        return true;
      }

      throw new Error("Unexpected response format");
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error?.message || error);
      throw error;
    }
  },

  async search(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "sqft_c" } },
          { field: { Name: "lot_size_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "city_c",
                    operator: "Contains",
                    values: [query],
                  },
                ],
              },
              {
                conditions: [
                  {
                    fieldName: "state_c",
                    operator: "Contains",
                    values: [query],
                  },
                ],
              },
              {
                conditions: [
                  {
                    fieldName: "zip_code_c",
                    operator: "Contains",
                    values: [query],
                  },
                ],
              },
              {
                conditions: [
                  {
                    fieldName: "address_c",
                    operator: "Contains",
                    values: [query],
                  },
                ],
              },
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query],
                  },
                ],
              },
            ],
          },
        ],
        orderBy: [{ fieldName: "listing_date_c", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 },
      };

      const response = await apperClient.fetchRecords("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(transformPropertyFromDb);
    } catch (error) {
      console.error("Error searching properties:", error?.message || error);
      throw error;
    }
  },

  async getByFilters(filters) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const whereConditions = [];

      if (filters.priceMin) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseFloat(filters.priceMin)],
        });
      }

      if (filters.priceMax) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "LessThanOrEqualTo",
          Values: [parseFloat(filters.priceMax)],
        });
      }

      if (filters.propertyType && filters.propertyType.length > 0) {
        whereConditions.push({
          FieldName: "property_type_c",
          Operator: "ExactMatch",
          Values: filters.propertyType,
        });
      }

      if (filters.bedrooms) {
        whereConditions.push({
          FieldName: "bedrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.bedrooms)],
        });
      }

      if (filters.bathrooms) {
        whereConditions.push({
          FieldName: "bathrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseFloat(filters.bathrooms)],
        });
      }

      if (filters.sqftMin) {
        whereConditions.push({
          FieldName: "sqft_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.sqftMin)],
        });
      }

      const whereGroups = [];
      if (filters.location) {
        whereGroups.push({
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "city_c",
                  operator: "Contains",
                  values: [filters.location],
                },
              ],
            },
            {
              conditions: [
                {
                  fieldName: "state_c",
                  operator: "Contains",
                  values: [filters.location],
                },
              ],
            },
            {
              conditions: [
                {
                  fieldName: "zip_code_c",
                  operator: "Contains",
                  values: [filters.location],
                },
              ],
            },
          ],
        });
      }

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "sqft_c" } },
          { field: { Name: "lot_size_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "amenities_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "latitude_c" } },
          { field: { Name: "longitude_c" } },
        ],
        where: whereConditions,
        whereGroups: whereGroups,
        orderBy: [{ fieldName: "listing_date_c", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 },
      };

      const response = await apperClient.fetchRecords("property_c", params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(transformPropertyFromDb);
    } catch (error) {
      console.error("Error filtering properties:", error?.message || error);
throw error;
    }
  },
};