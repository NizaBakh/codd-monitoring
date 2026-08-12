from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.railway_service import RailwayService

router = APIRouter(
    prefix="/api",
    tags=["Railway"]
)


# =====================================================
# STATIONS
# =====================================================

@router.get("/railway-stations")
def get_railway_stations(db: Session = Depends(get_db)):

    return RailwayService.get_stations(db)


# =====================================================
# LINES
# =====================================================

@router.get("/railway-lines")
def get_railway_lines(db: Session = Depends(get_db)):

    return RailwayService.get_lines(db)