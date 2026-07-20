from pydantic import BaseModel


class BusStopBase(BaseModel):

    name: str

    district: str

    latitude: float

    longitude: float


class BusStopCreate(BusStopBase):
    pass


class BusStopUpdate(BusStopBase):
    pass


class BusStopResponse(BusStopBase):

    id: int

    class Config:
        from_attributes = True