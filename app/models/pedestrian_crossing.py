from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class PedestrianCrossing(Base):

    __tablename__ = "pedestrian_crossings"

    id: Mapped[int] = mapped_column(primary_key=True)

    street: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    crossing_type: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    width: Mapped[str] = mapped_column(
        String(30),
        nullable=True
    )

    length: Mapped[str] = mapped_column(
        String(30),
        nullable=True
    )

    geometry: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )