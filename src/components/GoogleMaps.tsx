import getGeocode from '@/utils/GeoLocation';
import React, { useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  addresses: string[];
}

const MapComponent: React.FC<MapComponentProps> = ({ addresses }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([]);
  const apiKey = 'AIzaSyCFQcxCyaUbVnKVMgyPhkpL5f42BPb2aaU';

  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(mapRef.current!, {
        zoom: 4,
        center: { lat: 0, lng: 0 },
      });

      const bounds = new google.maps.LatLngBounds();

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
        });

        // Check if marker position is valid before extending bounds
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
        
      });

      map.fitBounds(bounds);
    };

    if (window.google) {
      initMap();
    } else {
      // Load the Google Maps script dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [locations]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await Promise.all(
          addresses.map((address) => getGeocode(address, apiKey))
        );
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching geocode data:", error);
      }
    };

    fetchLocations();
  }, [addresses, apiKey]);

  return <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
