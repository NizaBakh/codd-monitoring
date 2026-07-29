from fastapi import APIRouter

from app.services.weather_service import WeatherService

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)


@router.get("/current")
def current_weather():

    return WeatherService.get_current_weather()