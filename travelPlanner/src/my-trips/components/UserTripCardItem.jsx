import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/services/GlobalApi"; // Fixed import path
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoURL, setPhotoURL] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userChoice?.location?.label,
    };
    try {
      const result = await GetPlaceDetails(data);
      // Safer access: Check if places exists and has items
      const photoName = result?.data?.places?.[0]?.photos?.[0]?.name; 
      
      if (photoName) {
        const Url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoURL(Url);
      } else {
        // Optional: Set a fallback image if no photo found
        setPhotoURL("/placeholder-image.jpg"); 
      }
    } catch (error) {
      console.error("Error fetching trip photo:", error);
    }
  };

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        <img
          className="object-cover rounded-xl mx-auto w-80 h-64"
          src={photoURL || "/placeholder-image.jpg"} // Show placeholder while loading
          alt={trip?.userChoice?.location?.label}
        />
        <div className="mt-2 px-2"> {/* Added some padding/margin for better text alignment */}
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