from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import Boolean

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class BusStop(Base):

    __tablename__ = "bus_stops"

    id: Mapped[int] = mapped_column(primary_key=True)

    stop_uid: Mapped[str] = mapped_column(String(50), default="")
    ivms_id: Mapped[str] = mapped_column(String(50), default="")

    name: Mapped[str] = mapped_column(String(200))
    district: Mapped[str] = mapped_column(String(100), default="")
    street_name: Mapped[str] = mapped_column(String(200), default="")

    organization_raw: Mapped[str] = mapped_column(String(200), default="")

    construction_raw: Mapped[str] = mapped_column(String(200), default="")
    construction_type: Mapped[str] = mapped_column(String(100), default="")
    construction_count: Mapped[int] = mapped_column(Integer, default=0)

    has_platform: Mapped[bool] = mapped_column(Boolean, default=False)
    has_shelter: Mapped[bool] = mapped_column(Boolean, default=False)
    has_bench: Mapped[bool] = mapped_column(Boolean, default=False)
    has_ramp: Mapped[bool] = mapped_column(Boolean, default=False)
    has_bin: Mapped[bool] = mapped_column(Boolean, default=False)
    has_info_board: Mapped[bool] = mapped_column(Boolean, default=False)

    bus_routes_raw: Mapped[str] = mapped_column(String(500), default="")

    last_inspection_at: Mapped[str] = mapped_column(String(100), default="")

    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)