import React from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import Slider from "react-slick"; // Import Slider
import "slick-carousel/slick/slick.css"; // Import CSS
import "slick-carousel/slick/slick-theme.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Restaurants = ({ trip }) => {
  const restaurants = trip?.tripData?.restaurants || [];

  // Slider settings similar to Hotels.jsx
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg bg-white/50 backdrop-blur-sm">
      <h2 className="text-4xl font-bold text-center mb-8">Recommended Restaurants</h2>
      
      {restaurants.length > 0 ? (
        <div className="slider-container px-4"> {/* Added px-4 to prevent cutting off arrows */}
          <Slider {...settings}>
            {restaurants.map((restaurant, i) => (
              <div key={i} className="p-3 h-full"> {/* Padding wrapper for gap between cards */}
                <RestaurantCardItem restaurant={restaurant} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="text-center text-gray-500">No restaurant recommendations available.</div>
      )}
    </div>
  );
};

const RestaurantCardItem = ({ restaurant }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer p-4 h-full border border-gray-100 min-h-[350px]"> {/* Added min-h */}
          <img
            src={restaurant?.imageUrl || "/placeholder.jpg"}
            alt={restaurant?.name}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <div className="w-full">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{restaurant?.name}</h3>
              <div className="flex items-center text-sm font-semibold bg-yellow-100 px-2 py-1 rounded text-yellow-700">
                {restaurant?.rating} <CiStar className="ml-1" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1 mb-2">
              {restaurant?.category || "Restaurant"}
            </p>
            <p className="text-sm text-gray-600 line-clamp-3">{restaurant?.description}</p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex flex-col gap-1">
            {restaurant?.name}
            <span className="text-sm font-normal text-gray-500">{restaurant?.address}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto"> {/* Added scroll for small screens */}
          {/* Veg Recommendations */}
          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-700 mb-2 flex items-center">
              🥬 Veg Recommendations
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              {restaurant?.["Veg Recommendations"]?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li>No specific veg recommendations listed.</li>}
            </ul>
          </div>

          {/* Non-Veg Recommendations */}
          <div className="p-3 bg-red-50 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-700 mb-2 flex items-center">
              🍗 Non-Veg Recommendations
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              {restaurant?.["Non-Veg Recommendations"]?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li>No specific non-veg recommendations listed.</li>}
            </ul>
          </div>

          <div className="pt-2">
             <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant?.name + " " + restaurant?.address)}`}
                target="_blank"
                className="w-full block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
             >
                View on Google Maps
             </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Restaurants;