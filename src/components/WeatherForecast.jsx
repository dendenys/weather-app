import { Calendar, Droplets } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { formatDate, formatTemperature, getWeatherIcon } from "../utils/weatherutils";

function WeatherForecast({ forecast, unit }) {
    const dailyForecast = forecast.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!acc[date]) acc[date] = item;
        return acc;
    }, {});
    const dailyItems = Object.values(dailyForecast).slice(0, 5);

    return (
        <div className="bg-white/10 shadow-2xl backdrop-blur-xl p-8 border border-white/20 rounded-3xl">
            <div className="flex items-center space-x-3 mb-8">
                <div className="bg-white/10 p-2 rounded-full">
                    <Calendar className="w-6 h-6 text-white/80" />
                </div>
                <h2 className="font-bold text-white text-2xl">5 Day Forecast</h2>
            </div>

            <div className="space-y-4">
                {dailyItems.map((item, index) => {
                    const iconName = getWeatherIcon(item.weather[0]);
                    const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
                    return (
                        <div key={item.dt} className="group flex justify-between items-center bg-white/5 hover:bg-white/10 backdrop-blur-sm p-5 border border-white/10 rounded-2xl transition-all duration-300">
                            <div className="flex flex-1 items-center space-x-5">
                                <div className="text-white/90 group-hover:text-white transform hover:scale-110 transition-all duration-300">
                                    <IconComponent size={40} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-white text-lg">{index === 0 ? "Today" : formatDate(item.dt)}</div>
                                    <div className="font-medium text-white/70 text-sm capitalize">{item.weather[0].description}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2 text-white/60">
                                    <Droplets className="w-4 h-4 text-blue-300" />
                                    <span className="font-medium text-sm">{Math.round(item.pop * 100)}%</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white text-xl">{formatTemperature(item.main.temp_max, unit)}°</div>
                                    <div className="font-medium text-white text-sm">{formatTemperature(item.main.temp_min, unit)}°</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeatherForecast;


