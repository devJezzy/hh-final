// utils/getCityNames.ts

import axios from "axios";

interface Feature {
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  type: string;
  properties: {
    osm_type: string;
    osm_id: number;
    extent?: [number, number, number, number];
    country: string;
    countrycode: string;
    osm_key: string;
    osm_value: string;
    name: string;
    type: string;
    city?: string;
    postcode?: string;
    locality?: string;
    street?: string;
    district?: string;
    housenumber?: string;
  };
}

interface ApiResponse {
  features: Feature[];
  type: string;
}

export const getCityNames = async (
  cityName: string,
  limit: number = 5
): Promise<string[]> => {
  const baseUrl = "https://photon.komoot.io/api/";
  try {
    const response = await axios.get<ApiResponse>(baseUrl, {
      params: {
        q: cityName,
        limit: limit,
      },
    });

    const names = response.data.features.map(
      (feature) => feature.properties.name
    );
    return names;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
