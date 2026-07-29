from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.telekomsoft_repository import TelekomsoftRepository

router = APIRouter(
    prefix="/api/telekomsoft",
    tags=["Telekomsoft"]
)


@router.get("/")
def get_telekomsoft(db: Session = Depends(get_db)):

    objects = TelekomsoftRepository.get_all(db)

    return [

        {
            "id": obj.id,
            "number": obj.object_number,
            "type": obj.object_type,
            "district": obj.district,
            "address": obj.address,
            "latitude": obj.latitude,
            "longitude": obj.longitude,
            "construction_status": obj.construction_status,
            "system_visibility": obj.system_visibility,
            "controller_status": obj.controller_status,
            "entrepreneur": obj.entrepreneur
        }

        for obj in objects

    ]