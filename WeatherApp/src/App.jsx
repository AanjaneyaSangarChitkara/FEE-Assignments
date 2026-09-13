import { useState } from "react";
import "./App.css";

function getWeather(code) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain";
  if (code <= 99) return "Storm";
  return "Unknown";
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=10&language=en&format=json&countryCode=IN`
      );

      const locationData = await locationResponse.json();

      if (!locationData.results) {
        throw new Error("City not found");
      }

      const location = locationData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        location,
        current: weatherData.current,
        daily: weatherData.daily
      });
    } catch (err) {
      setWeather(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-box">
        <h1>Weather Check</h1>
        <p className="subtitle">Check the weather in any Indian city</p>

        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchWeather();
            }}
          />
          <button onClick={searchWeather}>Search</button>
        </div>

        {loading && <p className="message">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && !loading && (
          <>
            <div className="current">
              <div>
                <h2>{weather.location.name}</h2>
                <p>{weather.location.admin1}</p>
              </div>

              <div className="temperature">
                {Math.round(weather.current.temperature_2m)}°C
              </div>

              <p className="condition">
                {getWeather(weather.current.weather_code)}
              </p>

              <div className="details">
                <div>
                  <span>Feels like</span>
                  <strong>
                    {Math.round(weather.current.apparent_temperature)}°C
                  </strong>
                </div>

                <div>
                  <span>Humidity</span>
                  <strong>
                    {weather.current.relative_humidity_2m}%
                  </strong>
                </div>

                <div>
                  <span>Wind</span>
                  <strong>
                    {Math.round(weather.current.wind_speed_10m)} km/h
                  </strong>
                </div>
              </div>
            </div>

            <h2 className="forecast-title">7 Day Forecast</h2>

            <div className="forecast">
              {weather.daily.time.map((date, index) => (
                <div className="day" key={date}>
                  <p>{new Date(date).toLocaleDateString("en-IN", {
                    weekday: "short"
                  })}</p>

                  <strong>
                    {getWeather(weather.daily.weather_code[index])}
                  </strong>

                  <span>
                    {Math.round(weather.daily.temperature_2m_max[index])}° /
                    {" "}
                    {Math.round(weather.daily.temperature_2m_min[index])}°
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;