from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String

from app.core.database import Base


class Camera(Base):

    __tablename__ = "cameras"

    id = Column(Integer, primary_key=True, index=True)

    number = Column(Integer)

    district = Column(String)

    address = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)