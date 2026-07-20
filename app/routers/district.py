from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.district import District

router = APIRouter(
    prefix="/api/districts",
    tags=["Districts"]
)


@router.get("/")
def get_districts(db: Session = Depends(get_db)):

    districts = db.query(District).all()

    result = []

    for district in districts:

        result.append({

            "id": district.id,

            "name": district.name,

            "name_ru": district.name_ru,

            "cad_id": district.cad_id,

            "geometry": district.geometry

        })

    return result