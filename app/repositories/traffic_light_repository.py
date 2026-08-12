from sqlalchemy.orm import Session

from app.models.traffic_light import TrafficLight


class TrafficLightRepository:

    @staticmethod
    def get_all(db: Session):

        return db.query(TrafficLight).all()

    @staticmethod
    def get_by_id(
        db: Session,
        id: int
    ):

        return (
            db.query(TrafficLight)
            .filter(
                TrafficLight.id == id
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        data
    ):

        obj = TrafficLight(

            name=data.name,

            district=data.district,

            mahalla=data.mahalla,

            owner=data.owner,

            latitude=data.latitude,

            longitude=data.longitude,

            status=data.status

        )

        db.add(obj)

        db.commit()

        db.refresh(obj)

        return obj

    @staticmethod
    def update(
        db: Session,
        obj,
        data
    ):

        obj.name = data.name

        obj.district = data.district

        obj.mahalla = data.mahalla

        obj.owner = data.owner

        obj.latitude = data.latitude

        obj.longitude = data.longitude

        obj.status = data.status

        db.commit()

        db.refresh(obj)

        return obj

    @staticmethod
    def delete(
        db: Session,
        obj
    ):

        db.delete(obj)

        db.commit()