from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.bus_stop import (
    BusStopCreate,
    BusStopUpdate,
    BusStopResponse
)

from app.services.bus_stop_service import BusStopService

router = APIRouter(

    prefix="/api/bus-stops",

    tags=["Bus Stops"]

)


@router.get("/")
def get_all(db: Session = Depends(get_db)):

    try:

        data = BusStopService.get_all(db)

        return [

            {

                "id": x.id,

                "stop_uid": x.stop_uid,
                "ivms_id": x.ivms_id,

                "name": x.name,
                "district": x.district,
                "street_name": x.street_name,

                "organization_raw": x.organization_raw,

                "construction_raw": x.construction_raw,
                "construction_type": x.construction_type,
                "construction_count": x.construction_count,

                "has_platform": x.has_platform,
                "has_shelter": x.has_shelter,
                "has_bench": x.has_bench,
                "has_ramp": x.has_ramp,
                "has_bin": x.has_bin,
                "has_info_board": x.has_info_board,

                "bus_routes_raw": x.bus_routes_raw,

                "last_inspection_at": x.last_inspection_at,

                "latitude": x.latitude,
                "longitude": x.longitude

            }

            for x in data

        ]

    except Exception as e:

        return {

            "error": str(e),
            "type": str(type(e))

        }


@router.get("/{id}", response_model=BusStopResponse)
def get_one(id: int, db: Session = Depends(get_db)):

    obj = BusStopService.get_by_id(db, id)

    if obj is None:

        raise HTTPException(404, "Bus stop not found")

    return obj


@router.post("/", response_model=BusStopResponse)
def create(data: BusStopCreate, db: Session = Depends(get_db)):

    return BusStopService.create(db, data)


@router.put("/{id}", response_model=BusStopResponse)
def update(

    id: int,
    data: BusStopUpdate,
    db: Session = Depends(get_db)

):

    obj = BusStopService.get_by_id(db, id)

    if obj is None:

        raise HTTPException(404, "Bus stop not found")

    return BusStopService.update(db, obj, data)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):

    obj = BusStopService.get_by_id(db, id)

    if obj is None:

        raise HTTPException(404, "Bus stop not found")

    BusStopService.delete(db, obj)

    return {

        "success": True

    }