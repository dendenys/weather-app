function TemperatureToggle({ unit, onToggle }) {
  return (
    <div className="bg-white/10 p-1 rounded-2xl shadow-lg backdrop-blur-xl flex items-center">
      <button
        onClick={() => onToggle("C")}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${unit === "C" ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle("F")}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${unit === "F" ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}`}
      >
        °F
      </button>
    </div>
  );
}

export default TemperatureToggle;


