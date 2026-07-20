from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class MetroLine(Base):

    __tablename__ = "metro_lines"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    line_id: Mapped[str] = mapped_column(
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

    color: Mapped[str] = mapped_column(
        String(20),
        nullable=True
    )

    geometry: Mapped[str] = mapped_column(
        Text
    )