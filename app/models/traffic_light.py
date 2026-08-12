from sqlalchemy import Float
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class TrafficLight(Base):

    __tablename__ = "traffic_lights"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    osm_id: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    name: Mapped[str] = mapped_column(
        String(200)
    )

    district: Mapped[str] = mapped_column(
        String(150),
        nullable=True
    )

    mahalla: Mapped[str] = mapped_column(
        String(150),
        nullable=True
    )

    owner: Mapped[str] = mapped_column(
        String(150),
        nullable=True
    )

    latitude: Mapped[float] = mapped_column(
        Float
    )

    longitude: Mapped[float] = mapped_column(
        Float
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="ACTIVE"
    )