import os
import requests


class WeatherService:

    LAT = 41.3111
    LON = 69.2797

    API_KEY = os.getenv("WEATHER_API_KEY")

    @staticmethod
    def get_current_weather():

        if not WeatherService.API_KEY:
            raise Exception("WEATHER_API_KEY is not configured")

        url = (
            "https://api.openweathermap.org/data/2.5/weather"
            f"?lat={WeatherService.LAT}"
            f"&lon={WeatherService.LON}"
            "&units=metric"
            "&lang=ru"
            f"&appid={WeatherService.API_KEY}"
        )

        response = requests.get(url, timeout=10)

        response.raise_for_status()

        data = response.json()

        return {
            "city": data["name"],
            "temperature": round(data["main"]["temp"]),
            "feels_like": round(data["main"]["feels_like"]),
            "humidity": data["main"]["humidity"],
            "visibility": round(data["visibility"] / 1000, 1),
            "wind": data["wind"]["speed"],
            "clouds": data["clouds"]["all"],
            "precipitation": data.get("rain", {}).get("1h", 0),
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"]
        }