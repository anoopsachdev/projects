import React from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const HotelCardItem = ({ h }) => {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        h?.name +
        "," +
        h?.address
      }
      target="_blank"
    >
      <div className="flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <img 
          className="w-80 h-52 rounded-md object-cover" 
          // Use the fetched image, fallback to AI's image, fallback to placeholder
          src={h?.hotelImageUrl || h?.imageUrl || "/placeholder.jpg"} 
          alt={h?.name} 
        />
        <div className="flex w-full items-center justify-between px-8 mt-2">
          <div className="font-bold">{h.name}</div>
          <div className="flex items-center">
            {h.rating}
            <CiStar className="text-yellow-500" />
          </div>
        </div>
        <div className="w-full px-8 my-1 text-md text-gray-500 truncate">
          {h.address}
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;