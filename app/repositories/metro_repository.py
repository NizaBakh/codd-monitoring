from sqlalchemy.orm import Session

from app.models.metro_station import MetroStation
from app.models.metro_line import MetroLine


class MetroRepository:

    # =====================================================
    # STATIONS
    # =====================================================

    @staticmethod
    def get_stations(db: Session):

        return (

            db.query(MetroStation)

            .order_by(MetroStation.name)

            .all()

        )

    # =====================================================
    # LINES
    # =====================================================

    @staticmethod
    def get_lines(db: Session):

        return (

            db.query(MetroLine)

            .order_by(MetroLine.name)

            .all()

        )