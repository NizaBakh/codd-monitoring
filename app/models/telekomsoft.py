from sqlalchemy import Column, Integer, String, Float

from app.core.database import Base


class Telekomsoft(Base):

    __tablename__ = "telekomsoft"

    id = Column(Integer, primary_key=True, index=True)

    object_number = Column(String)

    object_type = Column(String)

    district = Column(String)

    address = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    construction_status = Column(String)

    system_visibility = Column(String)

    controller_status = Column(String)

    entrepreneur = Column(String)