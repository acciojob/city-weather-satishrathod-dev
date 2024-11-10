import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

const WeatherReport = ({ handleClick }) => {
  const [city, setCity] = useState("");

  const handleCity = () => {
    if (city) {
      handleClick(city);
    } else {
      alert("Please enter a city");
    }
  };

  console.log(handleClick);
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-btn" onClick={handleCity}>
        Search
      </button>
    </div>
  );
};

export default WeatherReport;
