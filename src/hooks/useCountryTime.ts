import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // To handle UTC time
import { useState, useEffect } from "react";
import timezone from "dayjs/plugin/timezone"; // For time zone conversion
import { Fetch } from "../utils/apiUtils";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Hook output type
interface CountryTime {
  countryDetails: any;
  currentTimestamp: string;
  convertedTimes: {
    IST: string;
    UTC: string;
    NYT: string; // New York Time
  };
  error: string | null;
}

const useCountryTime = (): CountryTime => {
  const [countryDetails, setCountryDetails] = useState<any>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState<string>("");
  const [convertedTimes, setConvertedTimes] = useState<{
    IST: string;
    UTC: string;
    NYT: string;
  }>({
    IST: "",
    UTC: "",
    NYT: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await Fetch(
          "https://ipinfo.io?token=d86f4e085241d8",
          {},
          5000,
          true,
          false
        );
        setCountryDetails(response);
      } catch (error) {
        setError("Failed to fetch country details.");
      }
    };

    // Update the timestamp and converted time every minute
    const updateTime = () => {
      const now = dayjs();
      setCurrentTimestamp(now.format("YYYY-MM-DD HH:mm:ss"));

      // Convert to IST, UTC, and New York Time
      setConvertedTimes({
        IST: now.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
        UTC: now.utc().format("YYYY-MM-DD HH:mm:ss"),
        NYT: now.tz("America/New_York").format("YYYY-MM-DD HH:mm:ss"),
      });
    };

    // Fetch country details and update time every minute
    fetchCountryDetails();
    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, []);

  return { countryDetails, currentTimestamp, convertedTimes, error };
};

export default useCountryTime;
