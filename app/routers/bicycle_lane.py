from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.bicycle_lane_service import BicycleLaneService

router = APIRouter(
    prefix="/api/bicycle-lanes",
    tags=["Bicycle Lanes"]
)


@router.get("/")
def get_bicycle_lanes(db: Session = Depends(get_db)):
    return BicycleLaneService.get_all(db)