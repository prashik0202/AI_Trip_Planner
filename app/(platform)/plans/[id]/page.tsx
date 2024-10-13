"use client";
import database from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Hotel,
  MapPinCheckIcon,
  Star,
} from "lucide-react";
import { HotelDetails, itineraryDetails, TripDetails } from "@/lib/types";

const StarRating = ({ ratingString }: { ratingString: string }) => {
  // Extract the number from the string (e.g., "4" from "4-star")
  const rating = parseInt(ratingString.split("-")[0]);

  // Create an array with 'rating' number of stars
  const stars = Array(rating).fill("⭐");

  return (
    <>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </>
  );
};

const TripDetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tripDetails, setTripDetails] = React.useState<TripDetails>();
  const [hotelDetails, setHotelDetails] = React.useState<HotelDetails[]>([]);
  const [itinerary, setItinerary] = React.useState<itineraryDetails[]>([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const docRef = doc(database, "plans", params.id.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setTripDetails(data.trip.tripDetails);
        setHotelDetails(data.trip.hotels);
        setItinerary(data.trip.itinerary);
        console.log(data.trip.itinerary);
        setLoading(false);
      } else {
        console.log("No document found");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-10 md:p-20 lg:p-32 flex flex-col gap-10 justify-start">
      {/* Trip Details */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">
          Location: {tripDetails?.location}
        </h1>
        <p className="text-xl">
          Your trip duration is{" "}
          <span className="font-bold underline underline-offset-4">
            {tripDetails?.duration}
          </span>{" "}
          and budget for same is{" "}
          <span className="font-bold underline underline-offset-4">
            {tripDetails?.budget}
          </span>{" "}
          and your travelling{" "}
          <span className="font-bold underline underline-offset-4">
            {tripDetails?.travelers}
          </span>
        </p>
      </div>
      {/* Hotels */}
      <div>
        <h1 className="text-3xl mb-5">Hotel Options</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotelDetails.map((item, index) => (
            <div
              className="w-full h-fit border-2 p-5 rounded-md shadow-xl flex flex-col gap-4 justify-start items-start"
              key={index}
            >
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-2 text-sky-700">
                  <Hotel />
                  {item.hotelName}
                </h1>
                <p className="text-sm text-neutral-600 font-semibold mt-1">
                  {item.description}
                </p>
                <p className="text-sm text-neutral-400 flex items-center gap-2 mt-2">
                  <MapPinCheckIcon />
                  {item.hotelAddress}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-emerald-600 font-bold">{item.price}</p>
                <p className="p-1 w-fit px-4 rounded-full text-sm my-2">
                  {/* {item.rating}{" "} */}
                  <StarRating ratingString={item.rating.toString()} />
                </p>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <Link
                    target="_blank"
                    href={item.bookingUrl}
                    className="bg-sky-700 text-white p-2 rounded-md w-fit text-sm flex items-center gap-2"
                  >
                    Book your stay <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    target="_blank"
                    href={item.hotelWebsiteUrl}
                    className="text-sm underline underline-offset-4 text-sky-800 font-bold flex items-center gap-2"
                  >
                    Hotel Website <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl mb-5">Itinerary Details</h1>
        {itinerary.map((item, index) => (
          <div key={index} className="flex flex-col justify-between gap-5">
            <div className="flex gap-2 items-center mt-5">
              <h1 className="text-2xl">Day {item.day}</h1>
              <span>|</span>
              <h1 className="text-md font-bold text-sky-700">
                Best Time to visit{item.bestTimeToVisit}
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {item.activities.map((activity, index) => (
                <div
                  key={index}
                  className="w-full h-fit border-2 p-5 rounded-md shadow-xl flex flex-col gap-4 justify-start items-start"
                >
                  <h1 className="text-2xl text-sky-700 font-bold">
                    {activity.placeName}
                  </h1>
                  <p className="text-sm text-neutral-600 font-semibold mt-1">
                    {activity.placeDetails}
                  </p>
                  <p className="flex gap-2 items-center text-sm text-neutral-500">
                    <Clock className="h-4 w-4" />
                    {activity.timeTravel}
                  </p>
                  <p className="text-sm font-semibold ">
                    Rating : {activity.rating}
                  </p>
                  <p className="text-emerald-700 font-bold">
                    {activity.ticketPricing}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripDetailsPage;
