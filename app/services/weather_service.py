import requests


class WeatherService:

    URL = (
        "https://api.open-meteo.com/v1/forecast"
        "?latitude=41.3111"
        "&longitude=69.2797"
        "&current="
        "temperature_2m,"
        "relative_humidity_2m,"
        "apparent_temperature,"
        "precipitation,"
        "cloud_cover,"
        "visibility,"
        "wind_speed_10m,"
        "weather_code"
    )

    @staticmethod
    def get_current_weather():

        response = requests.get(WeatherService.URL, timeout=10)

        response.raise_for_status()

        current = response.json()["current"]

        weather_code = current["weather_code"]

        weather_map = {
            0: "☀️ Ясно",
            1: "🌤 Малооблачно",
            2: "⛅ Переменная облачность",
            3: "☁️ Пасмурно",
            45: "🌫 Туман",
            48: "🌫 Туман",
            51: "🌦 Морось",
            61: "🌧 Дождь",
            71: "❄️ Снег",
            80: "🌦 Ливень",
            95: "⛈ Гроза"
        }

        return {
            "city": "Ташкент",
            "temperature": current["temperature_2m"],
            "feels_like": current["apparent_temperature"],
            "humidity": current["relative_humidity_2m"],
            "visibility": current["visibility"] / 1000,
            "wind": current["wind_speed_10m"],
            "clouds": current["cloud_cover"],
            "precipitation": current["precipitation"],
            "description": weather_map.get(weather_code, "🌍 Неизвестно")
        }