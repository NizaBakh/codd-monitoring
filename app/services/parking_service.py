from sqlalchemy.orm import Session

from app.repositories.parking_repository import ParkingRepository


class ParkingService:

    @staticmethod
    def get_all(db: Session):

        return ParkingRepository.get_all(db)