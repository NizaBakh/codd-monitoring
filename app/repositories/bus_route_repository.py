from sqlalchemy.orm import Session
from app.models.bus_route import BusRoute


class BusRouteRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(BusRoute).all()