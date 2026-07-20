from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.road import Road

router = APIRouter(
    prefix="/api/roads",
    tags=["Roads"]
)


@router.get("/")
def get_roads(db: Session = Depends(get_db)):

    roads = db.query(Road).all()

    result = []

    for road in roads:

        result.append({

            "id": road.id,
            "name": road.name,
            "district": road.district,
            "geoname_id": road.geoname_id,
            "geometry": road.geometry

        })

    return result