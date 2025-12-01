import axios from "axios";
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
import conf from "../conf/conf.js"
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": conf.googlePlaceApiKey,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // ✅ Must be a single string
  },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);