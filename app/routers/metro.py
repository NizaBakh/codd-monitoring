from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.metro_service import MetroService

from app.schemas.metro import MetroStationResponse
from app.schemas.metro import MetroLineResponse


router = APIRouter(

    prefix="/api/metro",

    tags=["Metro"]

)


# =====================================================
# STATIONS
# =====================================================

@router.get(

    "/stations",

    response_model=list[MetroStationResponse]

)
def get_stations(

    db: Session = Depends(get_db)

):

    return MetroService.get_stations(db)


# =====================================================
# LINES
# =====================================================

@router.get(

    "/lines",

    response_model=list[MetroLineResponse]

)
def get_lines(

    db: Session = Depends(get_db)

):

    return MetroService.get_lines(db)