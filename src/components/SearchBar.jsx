import { MapPin, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/weatherApi";

function SearchBar({ onSearch, onLocationSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length > 2) {
        setSearchLoading(true);
        try {
          const result = await searchCities(query);
          setSuggestions(result);
          setShowSuggestion(true);
        } catch (err) {
          console.error("Search Failed:", err);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestion(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowSuggestion(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestion(false);
  };

  const handleSuggestionClick = (city) => {
    const cityName = city.name ? `${city.name}, ${city.state || ""}` : city.name;
    onSearch(cityName);
    setQuery("");
    setShowSuggestion(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="absolute top-1/2 left-4 w-5 h-5 text-white/50 group-focus-within:text-white transform -translate-y-1/2 transition-all" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any city..."
            className="w-full py-4 pl-12 pr-24 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/50 transition-all"
          />
          {query && (
            <button
              type="button"
              className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
              onClick={clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
            onClick={onLocationSearch}
            disabled={loading}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showSuggestion && (suggestions.length > 0 || searchLoading) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden z-50">
          {searchLoading ? (
            <div className="p-6 text-white/70 text-center">
              <div className="mx-auto w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p>Searching cities...</p>
            </div>
          ) : (
            suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSuggestionClick(city)}
                className="flex justify-between items-center w-full px-6 py-4 text-left hover:bg-white/20 transition-all"
              >
                <div>
                  <div className="font-medium text-white">{city.name}{city.state && <span className="text-white/70">, {city.state}</span>}</div>
                  <div className="text-white/60 text-sm">{city.country}</div>
                </div>
                <Search className="w-4 h-4 text-white/40" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;


