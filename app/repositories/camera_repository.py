from sqlalchemy.orm import Session

from app.models.camera import Camera


class CameraRepository:

    @staticmethod
    def get_all(db: Session):

        return (

            db.query(Camera)

            .order_by(Camera.number)

            .all()

        )

    @staticmethod
    def count(db: Session):

        return db.query(Camera).count()