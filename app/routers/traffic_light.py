from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.traffic_light import *

from app.services.traffic_light_service import TrafficLightService

router=APIRouter(

    prefix="/api/traffic-lights",

    tags=["Traffic Lights"]

)


@router.get(
    "/",
    response_model=list[TrafficLightResponse]
)
def get_all(

    db:Session=Depends(get_db)

):

    return TrafficLightService.get_all(db)


@router.get(
    "/{id}",
    response_model=TrafficLightResponse
)
def get_one(

    id:int,

    db:Session=Depends(get_db)

):

    obj=TrafficLightService.get_by_id(db,id)

    if obj is None:

        raise HTTPException(404,"Traffic light not found")

    return obj


@router.post(
    "/",
    response_model=TrafficLightResponse
)
def create(

    data:TrafficLightCreate,

    db:Session=Depends(get_db)

):

    return TrafficLightService.create(db,data)


@router.put(
    "/{id}",
    response_model=TrafficLightResponse
)
def update(

    id:int,

    data:TrafficLightUpdate,

    db:Session=Depends(get_db)

):

    obj=TrafficLightService.get_by_id(db,id)

    if obj is None:

        raise HTTPException(404,"Traffic light not found")

    return TrafficLightService.update(db,obj,data)


@router.delete("/{id}")
def delete(

    id:int,

    db:Session=Depends(get_db)

):

    obj=TrafficLightService.get_by_id(db,id)

    if obj is None:

        raise HTTPException(404,"Traffic light not found")

    TrafficLightService.delete(db,obj)

    return {

        "success":True

    }