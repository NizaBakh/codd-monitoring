from sqlalchemy.orm import Session

from app.models.parking import Parking


class ParkingRepository:

    @staticmethod
    def get_all(db: Session):

        return (

            db.query(Parking)

            .order_by(Parking.id)

            .all()

        )