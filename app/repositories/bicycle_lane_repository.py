from sqlalchemy.orm import Session

from app.models.bicycle_lane import BicycleLane


class BicycleLaneRepository:

    @staticmethod
    def get_all(db: Session):

        return (
            db.query(BicycleLane)
            .order_by(BicycleLane.id)
            .all()
        )