from sqlalchemy.orm import Session

from app.repositories.bus_stop_repository import BusStopRepository


class BusStopService:

    @staticmethod
    def get_all(db: Session):

        return BusStopRepository.get_all(db)

    @staticmethod
    def get_by_id(db: Session, id: int):

        return BusStopRepository.get_by_id(db, id)

    @staticmethod
    def create(db: Session, data):

        return BusStopRepository.create(db, data)

    @staticmethod
    def update(db: Session, obj, data):

        return BusStopRepository.update(db, obj, data)

    @staticmethod
    def delete(db: Session, obj):

        return BusStopRepository.delete(db, obj)