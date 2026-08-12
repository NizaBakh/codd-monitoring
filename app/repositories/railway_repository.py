from sqlalchemy.orm import Session

from app.models.railway_station import RailwayStation
from app.models.railway_line import RailwayLine


class RailwayRepository:

    # =====================================================
    # STATIONS
    # =====================================================

    @staticmethod
    def get_stations(db: Session):

        return (

            db.query(RailwayStation)

            .order_by(RailwayStation.name)

            .all()

        )

    # =====================================================
    # LINES
    # =====================================================

    @staticmethod
    def get_lines(db: Session):

        return (

            db.query(RailwayLine)

            .order_by(RailwayLine.id)

            .all()

        )