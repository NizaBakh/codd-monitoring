from sqlalchemy.orm import Session

from app.repositories.bus_route_repository import BusRouteRepository


class BusRouteService:

    @staticmethod
    def get_all(db: Session):
        return BusRouteRepository.get_all(db)