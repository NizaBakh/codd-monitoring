from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base


class RailwayStation(Base):

    __tablename__ = "railway_stations"

    id = Column(Integer, primary_key=True, index=True)

    code = Column(String)

    name = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)