from sqlalchemy import String
from sqlalchemy import Float

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class MetroStation(Base):

    __tablename__ = "metro_stations"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    station_id: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    name_ru: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    # пока оставляем, позже будем заполнять
    line_name: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    color: Mapped[str] = mapped_column(
        String(20),
        nullable=True
    )

    # Новые поля
    vestibule: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    station_type: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    latitude: Mapped[float] = mapped_column(
        Float
    )

    longitude: Mapped[float] = mapped_column(
        Float
    )