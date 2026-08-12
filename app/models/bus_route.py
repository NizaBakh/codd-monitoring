from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base


class BusRoute(Base):
    __tablename__ = "bus_routes"

    id = Column(Integer, primary_key=True, index=True)

    route_number = Column(String, index=True)

    name = Column(String)

    geometry = Column(Text)