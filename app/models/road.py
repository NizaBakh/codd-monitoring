from typing import Optional

from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class Road(Base):

    __tablename__ = "roads"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(255)
    )

    district: Mapped[str] = mapped_column(
        String(100)
    )

    # Некоторые дороги не имеют ID_Geoname
    geoname_id: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True
    )

    geometry: Mapped[str] = mapped_column(
        Text
    )