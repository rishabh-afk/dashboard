import { useState, useEffect } from "react";

interface Geolocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

interface GeolocationError {
  message: string;
  code: number;
}

const useGeolocation = (): {
  location: Geolocation | null;
  error: GeolocationError | null;
} => {
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        message: "Geolocation is not supported by this browser.",
        code: 0,
      });
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      const {
        latitude,
        longitude,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        speed,
      } = position.coords;
      setLocation({
        latitude,
        longitude,
        accuracy,
        altitude: altitude ?? null, // altitude is not always available
        altitudeAccuracy: altitudeAccuracy ?? null, // altitudeAccuracy is not always available
        heading: heading ?? null, // heading is not always available
        speed: speed ?? null, // speed is not always available
        timestamp: position.timestamp, // Access timestamp from GeolocationPosition
      });
    };

    const errorCallback = (err: GeolocationPositionError) => {
      setError({ message: err.message, code: err.code });
    };

    const watcherId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback
    );

    return () => {
      // Cleanup: Stop watching geolocation on unmount
      navigator.geolocation.clearWatch(watcherId);
    };
  }, []);

  return { location, error };
};

export default useGeolocation;
