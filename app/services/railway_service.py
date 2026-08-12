from sqlalchemy.orm import Session

from app.repositories.railway_repository import RailwayRepository


class RailwayService:

    @staticmethod
    def get_stations(db: Session):

        return RailwayRepository.get_stations(db)

    @staticmethod
    def get_lines(db: Session):

        return RailwayRepository.get_lines(db)