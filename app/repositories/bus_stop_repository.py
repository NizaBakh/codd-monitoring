from sqlalchemy.orm import Session

from app.models.bus_stop import BusStop


class BusStopRepository:

    @staticmethod
    def get_all(db: Session):

        return db.query(BusStop).all()

    @staticmethod
    def get_by_id(db: Session, id: int):

        return db.query(BusStop).filter(
            BusStop.id == id
        ).first()

    @staticmethod
    def create(db: Session, data):

        obj = BusStop(

            name=data.name,

            district=data.district,

            latitude=data.latitude,

            longitude=data.longitude

        )

        db.add(obj)

        db.commit()

        db.refresh(obj)

        return obj

    @staticmethod
    def update(db: Session, obj, data):

        obj.name = data.name

        obj.district = data.district

        obj.latitude = data.latitude

        obj.longitude = data.longitude

        db.commit()

        db.refresh(obj)

        return obj

    @staticmethod
    def delete(db: Session, obj):

        db.delete(obj)

        db.commit()