import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

const WeatherReport = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApiData = async (location) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=af5ec3cbc297eb49628596779514b0c3&units=metric`;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      //   if (!res.ok) throw new Error("Weather Data not Found");
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchApiData(location);
    }
  }, []);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchApiData(location);
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="weather">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {weatherData && (
          <>
            <h3>{weatherData.name}</h3>
            <p>{weatherData.main.temp}°C</p>
            <p>{weatherData.weather[0].description}</p>
            <img></img>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherReport;
