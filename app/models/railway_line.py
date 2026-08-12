from sqlalchemy import Column, Integer, String, Text, Float

from app.core.database import Base


class RailwayLine(Base):

    __tablename__ = "railway_lines"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    length = Column(Float)

    geometry = Column(Text)