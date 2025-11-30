import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { toast } from "sonner";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    setUserTrips([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Adding doc.id to the object is crucial for deletion
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  useEffect(() => {
    GetUserTrips();
  }, []);

  // Function to handle trip deletion
  const handleDeleteTrip = async (tripId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

    try {
        await deleteDoc(doc(db, "AITrips", tripId));
        toast.success("Trip deleted successfully!");
        // Update the local state to remove the deleted trip immediately
        setUserTrips(prev => prev.filter(trip => trip.id !== tripId));
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete trip. Please try again.");
    }
  }

  return (
    <div className="p-10 md: px-20 lg:px-36">
      <h2 className="font-bold text-4xl text-center">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {userTrips.length > 0 ? (
            userTrips.map((trip, index) => (
            <UserTripCardItem 
                trip={trip} 
                key={index} 
                onDelete={handleDeleteTrip} // Passing the delete function
            />
            ))
        ) : (
            <div className="col-span-3 text-center text-gray-500 mt-10">
                No trips found. Create one to get started!
            </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;