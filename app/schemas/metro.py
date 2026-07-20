from pydantic import BaseModel
from pydantic import ConfigDict


class MetroStationResponse(BaseModel):

    id: int

    station_id: str | None = None

    name: str | None = None

    name_ru: str | None = None

    line_name: str | None = None

    color: str | None = None

    vestibule: str | None = None

    station_type: str | None = None

    latitude: float
 
    longitude: float

    model_config = ConfigDict(from_attributes=True)


class MetroLineResponse(BaseModel):

    id: int

    line_id: str | None = None

    name: str | None = None

    name_ru: str | None = None

    color: str | None = None

    geometry: str | None = None

    model_config = ConfigDict(from_attributes=True)