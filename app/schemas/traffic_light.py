from pydantic import BaseModel


class TrafficLightBase(BaseModel):

    name: str

    district: str | None = None

    mahalla: str | None = None

    owner: str | None = None

    latitude: float

    longitude: float

    status: str = "ACTIVE"


class TrafficLightCreate(TrafficLightBase):
    pass


class TrafficLightUpdate(TrafficLightBase):
    pass


class TrafficLightResponse(TrafficLightBase):

    id: int

    class Config:

        from_attributes = True