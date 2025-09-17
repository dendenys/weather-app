import {
    MapPin,
    Sunrise,
    Sunset,
    Eye,
    Wind,
    Droplets,
    Gauge,
    Thermometer,
} from "lucide-react";
import {
    formatTemperature,
    getWeatherIcon,
    formatTime,
} from "../utils/weatherutils";
import * as LucideIcons from "lucide-react";

function WeatherCard({ weather, unit }) {
    const iconName = getWeatherIcon(weather.weather[0]);
    const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

    const WeatherStats = [
        { icon: Eye, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, color: "text-blue-300" },
        { icon: Wind, label: "Wind", value: `${weather.wind.speed.toFixed(1)} m/s`, color: "text-green-300" },
        { icon: Droplets, label: "Humidity", value: `${weather.main.humidity}%`, color: "text-cyan-300" },
        { icon: Gauge, label: "Pressure", value: `${weather.main.pressure} hPa`, color: "text-purple-300" },
        { icon: Thermometer, label: "Feels Like", value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`, color: "text-orange-300" },
    ];

    return (
        <div className="bg-white/10 hover:bg-white/20 shadow-2xl backdrop-blur-xl p-8 border border-white/20 rounded-3xl transition-all duration-500">

            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-white/10 p-2 rounded-full">
                        <MapPin className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-white text-lg">{weather.name}</h2>
                        <p className="text-white/60 text-sm">{weather.sys.country}</p>
                    </div>
                </div>
                <div className="text-right text-white/70 text-sm">
                    {new Date(weather.dt * 1000).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    <div className="text-white/50 text-xs">
                        {new Date(weather.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-10">
                <div className="flex-1">
                    <div className="mb-3 font-bold text-white text-7xl tracking-tight">
                        {formatTemperature(weather.main.temp, unit)}°
                        <span className="text-4xl font-normal text-white/70">{unit}</span>
                    </div>
                    <div className="mb-2 font-medium text-white/90 text-xl capitalize">
                        {weather.weather[0].description}
                    </div>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                        <span>H: {formatTemperature(weather.main.temp_max, unit)}°</span>
                        <span>L: {formatTemperature(weather.main.temp_min, unit)}°</span>
                    </div>
                </div>
                <div className="text-white/90 transform hover:scale-110 transition-transform duration-300">
                    <IconComponent size={50} />
                </div>
            </div>
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-3 mb-6">
                {WeatherStats.map((stat, index) => (
                    <div key={index} className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-4 rounded-2xl transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <span className="font-medium text-white/70 text-sm">{stat.label}</span>
                        </div>
                        <div className="pl-11 font-semibold text-white text-lg">{stat.value}</div>
                    </div>
                ))}
            </div>
            <div className="gap-4 grid grid-cols-2">
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 border border-orange-400/20 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-orange-400/20 p-2 rounded-full">
                            <Sunrise className="w-4 h-4 text-orange-300" />
                        </div>
                        <span className="font-medium text-white/80 text-sm">Sunrise</span>
                    </div>
                    <div className="pl-11 font-semibold text-white text-lg">
                        {formatTime(weather.sys.sunrise)}
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 border border-purple-400/20 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-purple-400/20 p-2 rounded-full">
                            <Sunset className="w-4 h-4 text-purple-300" />
                        </div>
                        <span className="font-medium text-white/80 text-sm">Sunset</span>
                    </div>
                    <div className="pl-11 font-semibold text-white text-lg">
                        {formatTime(weather.sys.sunset)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;


