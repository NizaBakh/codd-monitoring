from sqlalchemy.orm import Session

from app.repositories.bicycle_lane_repository import BicycleLaneRepository


class BicycleLaneService:

    @staticmethod
    def get_all(db: Session):
        return BicycleLaneRepository.get_all(db)