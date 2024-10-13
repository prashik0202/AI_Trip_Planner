type geoCoordinates = {
  latitude: number;
  longitude: number;
};

export type TripDetails = {
  travelers: string;
  location: string;
  budget: string;
  duration: string;
};
export type HotelDetails = {
  bookingUrl: string;
  description: string;
  geoCoordinates: geoCoordinates;
  hotelAddress: string;
  hotelName: string;
  hotelWebsiteUrl: string;
  price: string;
  rating: number;
};

export type itineraryDetails = {
  bestTimeToVisit: string;
  day: number;
  activities: {
    geoCoordinates: geoCoordinates;
    placeDetails: string;
    placeName: string;
    rating: number;
    ticketPricing: string;
    timeTravel: string;
  }[];
};
