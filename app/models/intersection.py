from sqlalchemy import String
from sqlalchemy import Float

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class Intersection(Base):

    __tablename__ = "intersections"

    id: Mapped[int] = mapped_column(primary_key=True)

    object_id: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    latitude: Mapped[float] = mapped_column(
        Float
    )

    longitude: Mapped[float] = mapped_column(
        Float
    )