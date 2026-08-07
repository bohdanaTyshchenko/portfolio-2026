"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { TORONTO_PLACES } from "@/data/torontoPlaces";

const TORONTO = { lat: 43.6532, lng: -79.3832 };

/** Small heart pin matching the saved-list look in Google Maps. */
const HEART_PIN =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#d6d6d6"/><path fill="#e91e63" d="M12 17.3l-.9-.8C7.9 13.6 6 11.9 6 9.9 6 8.3 7.3 7 8.9 7c.9 0 1.8.4 2.4 1.1L12 8.8l.7-.7C13.3 7.4 14.2 7 15.1 7 16.7 7 18 8.3 18 9.9c0 2-1.9 3.7-5.1 6.6l-.9.8z"/></svg>`,
  );

type TorontoGoogleMapProps = {
  apiKey: string;
};

export function TorontoGoogleMap({ apiKey }: TorontoGoogleMapProps) {
  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={TORONTO}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI
          keyboardShortcuts={false}
          clickableIcons={false}
          className="h-full w-full"
        >
          {TORONTO_PLACES.map((place) => (
            <Marker
              key={`${place.name}-${place.lat}`}
              position={{ lat: place.lat, lng: place.lng }}
              title={place.name}
              icon={HEART_PIN}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
