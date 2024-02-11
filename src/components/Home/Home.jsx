import React, { useEffect, useState } from "react";
import Temperature from "../Temperature";
import Highlights from "../Highlights";

export const  Home =()=> {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("Celsius");
  const [unitSymbol, setUnitSymbol] = useState("°C");
  const [error, setError] = useState(null);
  // const [recentSearches, setRecentSearches] = useState([]);

  // useEffect(() => {
  //   const recentSearchesFromStorage = JSON.parse(localStorage.getItem("recentSearches")) || [];
  //   setRecentSearches(recentSearchesFromStorage);
  // }, []);
  
    const [recentSearchDropdownVisible, setRecentSearchDropdownVisible] = useState(false);
  
    const toggleRecentSearchDropdown = () => {
      setRecentSearchDropdownVisible(!recentSearchDropdownVisible);
    };
  useEffect(() => {
    if (city.trim() === "") {
      setError("Please enter a city");
      return;
    }

    // Debounce the fetch call
    const debounceTimer = setTimeout(() => {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=0eb2f9e6dd554873aa7120429230511&q=${city}&aqi=no;`;

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found. Please try again.");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          setError("");
          // setRecentSearches((prevSearches) => {
          //   const updatedSearches = [city, ...prevSearches.filter((item) => item !== city)].slice(0, 5);
          //   localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
          //   return updatedSearches;
          // });
        })
        .catch((e) => {
          console.log(e);
          setError("City not found. Please try again.");
        });
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [city]);

  useEffect(() => {
    setUnitSymbol(unit === "Celsius" ? "°C" : "°F");
  }, [unit]);

  // const handleRecentSearchClick = (city) => {
  //   setCity(city);
  // };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"));
  };

  return (
    <div className="bg-slate-800 min-h-screen flex flex-col lg:flex-row justify-center items-center px-4 md:px-8">
      <div className="py-20">
        <div className="text-slate-200 mb-10   sm:mt-0 md:mt-0">
          <button className="bg-gray-700 hover:bg-gray-500 px-4 py-2  rounded-md  " onClick={toggleUnit}>
            Temperature Unit ({unit})
          </button>
        </div>
        <Temperature
         setCity={setCity}
         unit={unit}
         unitSymbol={unitSymbol}
         onInputFieldClick={toggleRecentSearchDropdown}
         recentSearchDropdownVisible={recentSearchDropdownVisible}
          stats={
            weatherData
              ? { 
                  temp: unit === "Celsius" ? Math.floor(weatherData.current.temp_c) : Math.floor(weatherData.current.temp_f),
                  condition: weatherData.current.condition.text,
                  isDay: weatherData.current.is_day,
                  location: weatherData.location.name,
                  time: weatherData.location.localtime,
                }
              : null
          }
          error={error}
        />
      </div>
      {/* <div>
        <h2 className="text-slate-200 text-lg mt-4">Recent Searches</h2>
        <ul>
          {recentSearches.map((city, index) => (
            <li key={index} className="text-slate-200 cursor-pointer" onClick={() => handleRecentSearchClick(city)}>
              {city}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="mt-28 grid grid-cols-1 md:grid-cols-1 gap-6 lg:grid-cols-1 m-10 ">
        <div className="text-2xl  md:text-3xl text-center md:text-left md:items-start ">
          <h1 className="text-slate-200 ">Today's Highlights</h1>
        </div>
        {weatherData && (
          <>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2  gap-6 ">
              <Highlights
                stats={{
                  title: "Wind Status",
                  value: weatherData.current.wind_mph,
                  unit: "mph",
                  direction: weatherData.current.wind_dir,
                }}
              />
              <Highlights
                stats={{
                  title: "Humidity",
                  value: weatherData.current.humidity,
                  unit: "%",
                }}
              />
              <Highlights
                stats={{
                  title: "Visibility",
                  value: weatherData.current.vis_miles,
                  unit: "miles",
                }}
              />
              <Highlights
                stats={{
                  title: "Air Pressure",
                  value: weatherData.current.pressure_mb,
                  unit: "mb",
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
;
