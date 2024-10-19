export const maxDuration = 25; // This function can run for a maximum of 25 seconds
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import database from "@/lib/firebase";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-002",
});

export async function POST(request: Request) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Genrate a travel plan location : Mumbai, for 3 days for Couple with  high budget, Give me hotel options list with HotelName, Hotel address, HotelWebsiteUrl , BookingUrl ,Price, geo cordinates , rating, description and suggest itinerary with placeName, Place Details, geo Cordinates, ticket pricing, rating, Time travel each of the location for 3 days with day wise with best time to visit in pure JSON format and no comments in between.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "tripDetails": {\n    "location": "Mumbai",\n    "duration": "3 days",\n    "budget": "High",\n    "travelers": "Couple"\n  },\n  "hotels": [\n    {\n      "hotelName": "The Taj Mahal Palace, Mumbai",\n      "hotelAddress": "Apollo Bunder, Mumbai, Maharashtra 400001, India",\n      "hotelWebsiteUrl": "https://www.tajhotels.com/en-IN/taj/taj-mahal-palace-mumbai/",\n      "bookingUrl": "https://www.booking.com/hotel/in/taj-mahal-palace-mumbai.en-gb.html",\n      "price": "₹25,000 - ₹50,000 per night", \n      "geoCoordinates": {\n        "latitude": 18.9220,\n        "longitude": 72.8347\n      },\n      "rating": 5,\n      "description": "Iconic luxury hotel with stunning sea views and historical significance."\n    },\n    {\n      "hotelName": "The Oberoi, Mumbai",\n      "hotelAddress": "Nariman Point, Mumbai, Maharashtra 400021, India",\n      "hotelWebsiteUrl": "https://www.oberoihotels.com/hotels-in-mumbai/",\n      "bookingUrl": "https://www.booking.com/hotel/in/the-oberoi-mumbai.en-gb.html",\n      "price": "₹20,000 - ₹40,000 per night",\n      "geoCoordinates": {\n        "latitude": 18.9253,\n        "longitude": 72.8232\n      },\n      "rating": 4.8,\n      "description": "Modern luxury hotel with panoramic city and ocean views."\n    },\n    {\n      "hotelName": "St. Regis Mumbai",\n      "hotelAddress": "462, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013, India",\n      "hotelWebsiteUrl": "https://www.marriott.com/en-us/hotels/bomxr-the-st-regis-mumbai/overview/",\n      "bookingUrl": "https://www.booking.com/hotel/in/the-st-regis-mumbai.en-gb.html",\n      "price": "₹15,000 - ₹30,000 per night",\n      "geoCoordinates": {\n        "latitude": 18.9970,\n        "longitude": 72.8202\n      },\n      "rating": 4.7,\n      "description": "Stylish hotel with luxurious amenities and convenient location."\n    }\n\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "bestTimeToVisit": "Morning",\n      "activities": [\n        {\n          "placeName": "Gateway of India",\n          "placeDetails": "Historic monument overlooking the Arabian Sea.",\n          "geoCoordinates": {\n            "latitude": 18.9220,\n            "longitude": 72.8347\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "timeTravel": "2-3 hours"\n        },\n        {\n          "placeName": "Elephanta Caves",\n          "placeDetails": "Ancient cave temples dedicated to Lord Shiva.",\n          "geoCoordinates": {\n            "latitude": 18.9634,\n            "longitude": 72.9318\n          },\n          "ticketPricing": "₹500 (approx. for foreigners, less for Indians)",\n          "rating": 4.6,\n          "timeTravel": "Ferry ride + 2-3 hours at the caves"\n        }\n      ]\n    },\n    {\n      "day": 2,\n       "bestTimeToVisit": "Daytime",\n      "activities": [\n        {\n          "placeName": "Chhatrapati Shivaji Maharaj Terminus",\n          "placeDetails": "UNESCO World Heritage Site and a beautiful railway station.",\n          "geoCoordinates": {\n            "latitude": 18.9421,\n            "longitude": 72.8351\n          },\n          "ticketPricing": "Free (unless travelling by train)",\n          "rating": 4.7,\n          "timeTravel": "1-2 hours"\n        },\n        {\n          "placeName": "Dhobi Ghat",\n          "placeDetails": "Open-air laundry where clothes are washed traditionally.",\n          "geoCoordinates": {\n            "latitude": 18.9513,\n            "longitude": 72.8377\n          },\n          "ticketPricing": "Free",\n          "rating": 4.2,\n          "timeTravel": "1-2 hours"\n        },\n        {\n          "placeName": "Marine Drive",\n          "placeDetails": "Scenic promenade along the Arabian Sea.",\n          "geoCoordinates": {\n            "latitude": 18.9429,\n            "longitude": 72.8238\n          },\n          "ticketPricing": "Free",\n          "rating": 4.6,\n          "timeTravel": "Evening stroll (2-3 hours)" \n        }\n      ]\n    },\n    {\n      "day": 3,\n      "bestTimeToVisit": "Afternoon/Evening",\n      "activities": [\n        {\n          "placeName": "Bandra-Worli Sea Link",\n          "placeDetails": "Cable-stayed bridge offering stunning views.",\n          "geoCoordinates": {\n            "latitude": 19.0176,\n            "longitude": 72.8142\n          },\n\n          "ticketPricing": "Toll charges apply for vehicles",\n          "rating": 4.7,\n          "timeTravel": "Drive across (30 min - 1 hour) or admire from afar"\n        },\n        {\n          "placeName": "Juhu Beach",\n          "placeDetails": "Popular beach known for street food and sunset views.",\n          "geoCoordinates": {\n            "latitude": 19.1089,\n            "longitude": 72.8244\n          },\n          "ticketPricing": "Free",\n          "rating": 4.4,\n          "timeTravel": "2-3 hours"\n        },\n        {\n          "placeName": "Mohammed Ali Road (for foodies)",\n          "placeDetails": "Street food haven, especially vibrant during Ramadan.",\n          "geoCoordinates": {\n            "latitude": 18.9508,\n            "longitude": 72.8338\n          },\n          "ticketPricing": "Depends on food choices",\n          "rating": 4.6,\n          "timeTravel": "Evening (2-3 hours)"\n        }\n      ]\n    }\n  ]\n}\n```',
          },
        ],
      },
    ],
  });

  // get request body from the form that user submit
  const { location, days, budget, people } = await request.json();

  const result = await chatSession.sendMessage(
    `Genrate a travel plan location : ${location}, for ${days} days for ${people} with  ${budget} budget, Give me hotel options list with HotelName, Hotel address, HotelWebsiteUrl , BookingUrl ,Price, geo cordinates , rating, description and suggest itinerary with placeName, Place Details, geo Cordinates, ticket pricing, rating, Time travel each of the location for ${days} days with day wise with best time to visit in pure JSON format and no comments in between.`
  );
  // console.log(result.response.text());
  const cleanResponse = result.response.text().replace(/```json|```/g, "");
  console.log(cleanResponse);

  // get current user:
  const user = await currentUser();

  // saving the data to firebase firestore
  const dataRef = await addDoc(collection(database, "plans"), {
    trip: JSON.parse(cleanResponse),
    userId: user?.id,
  });

  if (dataRef.id) {
    return new Response(cleanResponse, { status: 200 });
  } else {
    return new Response("Error occurred", { status: 400 });
  }
}
