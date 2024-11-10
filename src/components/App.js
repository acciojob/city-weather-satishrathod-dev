import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import WeatherReport from "./WeatherReport";

const App = () => {
  const [weartherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  async function fetchWeather(query) {
    // const query = "delhi";

    if (!query) return;
    setLoading(true);
    setError(null);

    const API_KEY = "af5ec3cbc297eb49628596779514b0c3";
    try {
      const fetchData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      // fetchData.then((response) => console.log(response));
      const data = await fetchData.json();
      console.log(data);

      if (data.cod !== 200) {
        setError("City not found. Please try again.");
        setWeatherData(null);
        setLoading(false);
        return;
      }
      setWeatherData(data);
      setLoading(false);
      setCity("");
    } catch {
      setError("Failed to fetch weather data. Please try again");
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Do not remove the main div */}
      <h1>Weather App</h1>
      {/* Pass the fetchWeather function as a prop to WeatherReport */}
      <WeatherReport handleClick={fetchWeather} city={city} setCity={setCity} />

      {/* Display weather data if it exists */}
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weartherData && !loading && !error && (
        <div className="weather">
          <h2>
            Weather in {weartherData.name}, {weartherData.sys.country}
          </h2>
          <p>Temperature: {Math.round(weartherData.main.temp - 273.15)}°C</p>
          <p>
            Feels like: {Math.round(weartherData.main.feels_like - 273.15)}°C
          </p>
          <p>Weather: {weartherData.weather[0].description}</p>
          <p>Humidity: {weartherData.main.humidity}%</p>
          <p>Wind: {weartherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
