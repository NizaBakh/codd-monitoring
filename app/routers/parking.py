from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.parking_service import ParkingService

router = APIRouter(
    prefix="/api/parkings",
    tags=["Parkings"]
)


@router.get("/")
def get_parkings(db: Session = Depends(get_db)):

    return ParkingService.get_all(db)