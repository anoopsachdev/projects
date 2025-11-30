import { GetPlaceDetails } from "@/services/GlobalApi";
import { PHOTO_REF_URL } from "@/constants/options";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    // 1. Try to use the saved URL first (New Trips)
    if (trip?.userChoice?.location?.photoUrl) {
      setPhotoUrl(trip.userChoice.location.photoUrl);
    } 
    // 2. If no saved URL, fetch it (Old Trips)
    else if (trip?.userChoice?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userChoice?.location?.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      const photoName = result.data.places[0].photos[0].name;
      if (photoName) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.log("Error fetching trip photo:", error);
    }
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          className="object-cover rounded-xl mx-auto w-80 h-64"
          src={photoUrl || "/placeholder-image.jpg"}
          alt={trip?.userChoice?.location?.label}
        />
        <div className="mt-2 px-2">
          <h2 className="font-bold text-lg">
            {trip?.userChoice?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userChoice?.noOfDays} days trip with "
            {trip?.userChoice?.budget}" budget.
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;