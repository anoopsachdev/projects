import { GetPlaceDetails } from "@/services/GlobalApi";
import { PHOTO_REF_URL } from "@/constants/options";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Importing Trash Icon

const UserTripCardItem = ({ trip, onDelete }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip?.userChoice?.location?.photoUrl) {
      setPhotoUrl(trip.userChoice.location.photoUrl);
    } else if (trip?.userChoice?.location?.label) {
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
    <div className="relative hover:scale-105 transition-all hover:shadow-md rounded-xl group">
      <Link to={"/view-trip/" + trip?.id}>
        <div>
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

      {/* Delete Button */}
      <button 
        onClick={() => onDelete(trip.id)}
        className="absolute top-2 right-2 bg-red-500 p-2 rounded-full text-white shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
        title="Delete Trip"
      >
        <FaTrash size={14}/>
      </button>
    </div>
  );
};

export default UserTripCardItem;