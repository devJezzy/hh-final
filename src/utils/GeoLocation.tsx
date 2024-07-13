import axios from "axios";

function formatAddress(address: string): string {
  return encodeURIComponent(address);
}

export default async function getGeocode(address: string, apiKey: string) {
  const formattedAddress = formatAddress(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK" && response.data.results.length > 0) {
      const firstResult = response.data.results[0];
      console.log(firstResult["geometry"]["location"]);
      return firstResult["geometry"]["location"];
    } else {
      console.error(
        "Error:",
        response.data.error_message || "No results found."
      );
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}