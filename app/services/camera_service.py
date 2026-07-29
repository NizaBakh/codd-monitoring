from sqlalchemy.orm import Session

from app.repositories.camera_repository import CameraRepository


class CameraService:

    @staticmethod
    def get_all(db: Session):

        return CameraRepository.get_all(db)

    @staticmethod
    def count(db: Session):

        return CameraRepository.count(db)