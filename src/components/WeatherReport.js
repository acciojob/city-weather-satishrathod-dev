import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

const WeatherReport = ({ handleClick, city, setCity }) => {
  const [cityInput, setCityInput] = useState(city);

  const handleCity = () => {
    if (cityInput) {
      handleClick(cityInput);
      setCityInput("");
      setCity("");
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
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button className="search-btn" onClick={handleCity}>
        Search
      </button>
    </div>
  );
};

export default WeatherReport;
