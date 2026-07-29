from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.camera_service import CameraService

router = APIRouter(
    prefix="/api/cameras",
    tags=["Cameras"]
)


@router.get("/")
def get_cameras(db: Session = Depends(get_db)):

    return CameraService.get_all(db)


@router.get("/count")
def get_camera_count(db: Session = Depends(get_db)):

    return {

        "count": CameraService.count(db)

    }