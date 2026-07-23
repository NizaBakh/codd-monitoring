from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from app.core.database import Base


class Parking(Base):

    __tablename__ = "parkings"

    id = Column(Integer, primary_key=True, index=True)

    osm_id = Column(String)

    district = Column(String)

    area = Column(Float)

    latitude = Column(Float)

    longitude = Column(Float)

    geometry = Column(Text)