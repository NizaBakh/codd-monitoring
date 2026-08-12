from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.bus_route_service import BusRouteService

router = APIRouter(
    prefix="/api/bus-routes",
    tags=["Bus Routes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_routes(db: Session = Depends(get_db)):
    return BusRouteService.get_all(db)