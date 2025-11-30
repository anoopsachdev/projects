import conf from "../conf/conf.js";

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Going solo',
        icon: '🧳',
        people: '1',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Traveling with a partner',
        icon: '🥂',
        people: '2 People',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Traveling with family members',
        icon: '🏠',
        people: '3 to 5 People',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Group trip with friends',
        icon: '⛵️',
        people: '5 to 10 People',
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economy',
        desc: 'Budget-friendly options',
        icon: '💸',
        // budget: 'Less than $1000',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Comfortable and affordable',
        icon: '🛫',
        // budget: '$1000 - $3000',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences',
        icon: '🏝️',
        // budget: 'More than $3000',
    }
]

export const AI_PROMPT = `
  Generate a travel plan for the destination: {location} for {totalDays} days. 
  Traveler type: {traveler}, with a {budget} budget. 
  
  1. Hotel Options: Provide exactly 3 options.
  2. Itinerary: Suggest a daily plan for {totalDays} days.
  3. Recommended Restaurants: Provide exactly 4 options.
     Categorize them (e.g., Fine Dining, Authentic).
     Fields required: Name, Address, Rating, Category, Description, "Veg Recommendations" (max 2 items), "Non-Veg Recommendations" (max 2 items).

  IMPORTANT: Keep descriptions concise. Output strictly in valid JSON format only.
`;

// Add this to the bottom of src/constants/options.jsx
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  conf.googlePlaceApiKey;