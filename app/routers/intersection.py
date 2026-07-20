from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.intersection import Intersection

router = APIRouter(
    prefix="/api/intersections",
    tags=["Intersections"]
)


@router.get("/")
def get_intersections(db: Session = Depends(get_db)):

    intersections = db.query(Intersection).all()

    result = []

    for intersection in intersections:

        result.append({

            "id": intersection.id,

            "object_id": intersection.object_id,

            "name": intersection.name,

            "district": intersection.district,

            "latitude": intersection.latitude,

            "longitude": intersection.longitude

        })

    return result