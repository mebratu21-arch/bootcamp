// pages/WeatherPage.js
import { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../api/weatherApi";
import { FavoritesContext } from "../context/FavoritesContext";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const { addFavorite } = useContext(FavoritesContext);

  const handleSearch = async (city) => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch {
      alert("City not found");
    }
  };

  return (
    <div>
      <h1>Weather</h1>
      <SearchBar onSearch={handleSearch} />
      {weather && (
        <WeatherCard data={weather} onFavorite={addFavorite} />
      )}
    </div>
  );
}
