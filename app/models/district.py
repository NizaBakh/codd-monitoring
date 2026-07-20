from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class District(Base):

    __tablename__ = "districts"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(100)
    )

    name_ru: Mapped[str] = mapped_column(
        String(100)
    )

    cad_id: Mapped[str] = mapped_column(
        String(50)
    )

    geometry: Mapped[str] = mapped_column(
        Text
    )