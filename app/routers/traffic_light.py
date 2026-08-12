from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from pathlib import Path
import json

from app.core.database import get_db
from app.schemas.traffic_light import *
from app.services.traffic_light_service import TrafficLightService


router = APIRouter(
    prefix="/api/traffic-lights",
    tags=["Traffic Lights"]
)


# =====================================================
# MERGED GEOJSON
# =====================================================

MERGED_GEOJSON = Path("merged.geojson")


@router.get("/geojson")
def get_traffic_lights_geojson():

    if not MERGED_GEOJSON.exists():
        raise HTTPException(
            status_code=404,
            detail="merged.geojson not found"
        )

    try:

        with open(
            MERGED_GEOJSON,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"GeoJSON error: {str(e)}"
        )

TELEKOMSOFT_GEOJSON = Path("Телекомсофт.geojson")


@router.get("/telekomsoft-geojson")
def get_telekomsoft_geojson():

    if not TELEKOMSOFT_GEOJSON.exists():
        raise HTTPException(
            status_code=404,
            detail="Телекомсофт.geojson not found"
        )

    try:

        with open(
            TELEKOMSOFT_GEOJSON,
            "r",
            encoding="utf-8"
        ) as f:

            return json.load(f)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Telekomsoft GeoJSON error: {str(e)}"
        )
# =====================================================
# EXISTING DATABASE API
# =====================================================

@router.get(
    "/",
    response_model=list[TrafficLightResponse]
)
def get_all(
    db: Session = Depends(get_db)
):
    return TrafficLightService.get_all(db)


@router.get(
    "/{id}",
    response_model=TrafficLightResponse
)
def get_one(
    id: int,
    db: Session = Depends(get_db)
):

    obj = TrafficLightService.get_by_id(db, id)

    if obj is None:
        raise HTTPException(
            404,
            "Traffic light not found"
        )

    return obj


@router.post(
    "/",
    response_model=TrafficLightResponse
)
def create(
    data: TrafficLightCreate,
    db: Session = Depends(get_db)
):
    return TrafficLightService.create(db, data)


@router.put(
    "/{id}",
    response_model=TrafficLightResponse
)
def update(
    id: int,
    data: TrafficLightUpdate,
    db: Session = Depends(get_db)
):

    obj = TrafficLightService.get_by_id(db, id)

    if obj is None:
        raise HTTPException(
            404,
            "Traffic light not found"
        )

    return TrafficLightService.update(
        db,
        obj,
        data
    )


@router.delete("/{id}")
def delete(
    id: int,
    db: Session = Depends(get_db)
):

    obj = TrafficLightService.get_by_id(db, id)

    if obj is None:
        raise HTTPException(
            404,
            "Traffic light not found"
        )

    TrafficLightService.delete(
        db,
        obj
    )

    return {
        "success": True
    }