from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from app.core.database import Base


class BicycleLane(Base):

    __tablename__ = "bicycle_lanes"

    id = Column(Integer, primary_key=True, index=True)

    osm_id = Column(String)

    district = Column(String)   # ← ДОБАВИТЬ

    class_name = Column(String)

    class_label = Column(String)

    status = Column(String)

    length = Column(Float)

    surface = Column(String)

    segregated = Column(String)

    lit = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    geometry = Column(Text)