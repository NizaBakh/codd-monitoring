from sqlalchemy.orm import Session

from app.repositories.metro_repository import MetroRepository


class MetroService:

    # =====================================================
    # STATIONS
    # =====================================================

    @staticmethod
    def get_stations(db: Session):

        return MetroRepository.get_stations(db)

    # =====================================================
    # LINES
    # =====================================================

    @staticmethod
    def get_lines(db: Session):

        return MetroRepository.get_lines(db)