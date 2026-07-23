from sqlalchemy import Column, Integer, Float, String

from app.core.database import Base


class BridgeTunnel(Base):

    __tablename__ = "bridge_tunnels"

    id = Column(Integer, primary_key=True, index=True)

    osm_id = Column(String)

    full_id = Column(String)

    district = Column(String)

    address = Column(String)

    structure_type = Column(String)

    length = Column(Float)

    latitude = Column(Float)

    longitude = Column(Float)