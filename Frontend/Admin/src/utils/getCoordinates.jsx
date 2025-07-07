import * as Geocode from "react-geocode";
import { toast } from "react-toastify";

// Set your API key
// Geocode.setApiKey(import.meta.REACT_APP_GOOGLE_GEOCODING_API_KEY);
Geocode.setKey("AIzaSyBH2VOQ_YGFTI5v_X4972IU9zVpwr8xtg4");
Geocode.setLanguage("en");
Geocode.setRegion("us");

const getCoordinates = async (address) => {
  try {
    if (address.length < 10) {
      toast.error("address is too short");
      return;
    }
    const response = await Geocode.fromAddress(address);
    const { lat, lng } = response.results[0].geometry.location;
    toast.success("Location fetched");
    return { lat, lng };
  } catch (error) {
    console.error("Geocoding error:", error);
    toast.error("Error Fetching Location");
    return null;
  }
};

export default getCoordinates;
