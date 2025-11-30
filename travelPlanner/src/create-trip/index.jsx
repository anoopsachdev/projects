import React, { useState, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import conf from "../conf/conf.js";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { Input } from "@/components/ui/input.jsx";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList, PHOTO_REF_URL } from "@/constants/options.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig.jsx";
import { useNavigate } from "react-router-dom";
import { GetPlaceDetails } from "@/services/GlobalApi.jsx"; // Import API helper

function CreateTrip() {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: conf.googlePlaceApiKey,
    libraries: ["places"],
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      // 1. Parse JSON safely
      let cleanData = TripData;
      if (typeof TripData === "string") {
        const jsonMatch = TripData.match(/\{[\s\S]*\}/);
        cleanData = jsonMatch ? jsonMatch[0] : TripData;
      }
      let parsedTripData = JSON.parse(cleanData);

      // 2. Handle "hotel" vs "hotels" mismatch
      // The AI might return 'hotels' (plural), but our app expects 'hotel'
      const hotelList = parsedTripData.hotel || parsedTripData.hotels || [];
      
      // 3. Fetch images for the hotels
      if (hotelList.length > 0) {
        const updatedHotels = await Promise.all(
          hotelList.map(async (hotel) => {
            const photoUrl = await fetchPhotoUrl(hotel.name);
            return { ...hotel, hotelImageUrl: photoUrl };
          })
        );
        // Standardize the key to 'hotel'
        parsedTripData.hotel = updatedHotels;
        // Remove the plural key if it exists to avoid confusion
        if (parsedTripData.hotels) delete parsedTripData.hotels;
      }

      await setDoc(doc(db, "AITrips", docId), {
        userChoice: formData,
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId,
      });

      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Error generating trip. Please try again.");
      setLoading(false);
    }
  };

  // Helper to fetch photo URL using your GlobalApi
  const fetchPhotoUrl = async (query) => {
    try {
      const result = await GetPlaceDetails({ textQuery: query });
      const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoName) {
        return PHOTO_REF_URL.replace("{NAME}", photoName);
      }
    } catch (e) {
      console.log("Could not fetch image for", query);
    }
    return "/placeholder.jpg"; // Fallback image
  };

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      toast("Please enter trip days less than 5");
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData.noOfDays ||
      !formData.location ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replaceAll("{location}", formData?.location?.label)
      .replaceAll("{totalDays}", formData?.noOfDays)
      .replaceAll("{traveler}", formData?.traveler)
      .replaceAll("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast("AI Error: Check console for details");
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences🌴🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">Just provide some basic information…</p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">Destination</h2>
          <Autocomplete
            onLoad={(ac) => setPlaceAutocomplete(ac)}
            onPlaceChanged={() => {
              const place = placeAutocomplete.getPlace();
              // OPTIMIZATION: Get the photo URL immediately from the Autocomplete result
              const photoUrl = place.photos
                ? place.photos[0].getUrl({ maxWidth: 1000, maxHeight: 1000 })
                : null;

              handleInputChange("location", {
                label: place.name,
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                photoUrl: photoUrl, // Saving this here prevents API calls later!
              });
            }}
          >
            <Input placeholder="Search destination" />
          </Autocomplete>
        </div>

        {/* ... Rest of your inputs (Days, Budget, Traveler) ... */}
        {/* Keeping existing inputs for brevity, paste your Days/Budget/Traveler sections here */}
        
        <div>
          <h2 className="text-xl my-3 font-medium">Days</h2>
          <Input
            placeholder="Example: 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Budget</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((b, i) => (
              <div
                key={i}
                onClick={() => handleInputChange("budget", b.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData.budget === b.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-3xl">{b.icon}</h2>
                <h2 className="font-bold text-lg">{b.title}</h2>
                <h2 className="text-sm text-gray-500">{b.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Traveling With</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((t, i) => (
              <div
                key={i}
                onClick={() => handleInputChange("traveler", t.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                  formData.traveler === t.people ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-3xl">{t.icon}</h2>
                <h2 className="font-bold text-lg">{t.title}</h2>
                <h2 className="text-sm text-gray-500">{t.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading} className="bg-black text-white hover:bg-gray-800">
          {loading ? "Generating Trip..." : "Generate Trip"}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={() => login()} className="w-full mt-5 gap-4">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;