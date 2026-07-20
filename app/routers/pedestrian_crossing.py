from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.pedestrian_crossing import PedestrianCrossing

router = APIRouter(
    prefix="/api/pedestrian-crossings",
    tags=["Pedestrian Crossings"]
)


@router.get("/")
def get_pedestrian_crossings(db: Session = Depends(get_db)):

    crossings = db.query(PedestrianCrossing).all()

    result = []

    for crossing in crossings:

        result.append({

            "id": crossing.id,
            "street": crossing.street,
            "district": crossing.district,
            "crossing_type": crossing.crossing_type,
            "width": crossing.width,
            "length": crossing.length,
            "geometry": crossing.geometry

        })

    return result