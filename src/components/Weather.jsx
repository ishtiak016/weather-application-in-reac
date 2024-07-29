import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
const Weather = () => {
    const inputRef=useRef();
    const apiKey = import.meta.env.VITE_APP_ID;
    const all_icons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "010d":rain_icon,
        "010n":rain_icon,
        "013d":snow_icon,
        "013n":snow_icon,
    }
    const [weatherData,setWeatherData]=useState(false);

    const search=async(city)=>{
        if(!city){
            alert("Enter the city Name");
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            console.log(url);
            const response=await fetch(url);
            const data=await response.json();
            const icon=all_icons[data.weather[0].icon]||clear_icon;
            setWeatherData({
                humidity :data.main.humidity,
                wind_speed: data.wind.speed,
                temparature:Math.floor(data.main.temp),
                location :data.name,
                icon :icon,
            });
            console.log(data);
        } catch (error) {
            setWeatherData(false);
            console.error("Error is fetching weather data");
        }
    }

  
      
  useEffect(()=>{
    search("Jessore")
  },[])
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>
    {weatherData?<>
      <img src={weatherData.icon} className="weather-icon" />
      <p className="temparature">{weatherData.temparature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt={humidity_icon} />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt={wind_icon} />
          <div>
            <p>{weatherData.wind_speed} KM/H</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
    </div>
  );
};

export default Weather;
