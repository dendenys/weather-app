import React from "react";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import { useWeather } from "./hooks/useWeather";

function App() {
  const { currentWeather, forecast, loading, error, unit, fetchWeatherByCity, fetchWeatherByLocation, toggleUnit } = useWeather();

  const handleRetry = () => {
    if (currentWeather) fetchWeatherByCity(currentWeather.name);
    else fetchWeatherByCity("New York");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/happy-sunny-background-blue-sky-with-real-sun-light-clouds-good-day-warm-weather-big-size_638259-344.jpg)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
            Weather <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Pro</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Real-time weather data with beautiful visuals and precise forecasts worldwide
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-6 space-y-6 lg:space-y-0">
            <SearchBar onSearch={fetchWeatherByCity} onLocationSearch={fetchWeatherByLocation} loading={loading} />
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>
        <div className="space-y-8">
          {loading && (
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-3xl">
                <LoadingSpinner />
                <p className="mt-4 text-white/80 text-center font-medium">Fetching latest weather data...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="mx-auto max-w-2xl">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          )}

          {currentWeather && !loading && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <WeatherCard weather={currentWeather} unit={unit} />
              </div>
              <div className="xl:col-span-1">
                {forecast && <WeatherForecast forecast={forecast} unit={unit} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

