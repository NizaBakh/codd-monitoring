from sqlalchemy.orm import Session

from app.models.traffic_light import TrafficLight


class TrafficLightRepository:


    @staticmethod
    def get_all(db: Session):

        return db.query(TrafficLight).all()


    @staticmethod
    def get_by_id(db: Session,id:int):

        return db.query(TrafficLight).filter(
            TrafficLight.id==id
        ).first()


    @staticmethod
    def create(db:Session,data):

        obj=TrafficLight(

            name=data.name,

            latitude=data.latitude,

            longitude=data.longitude,

            status=data.status

        )

        db.add(obj)

        db.commit()

        db.refresh(obj)

        return obj


    @staticmethod
    def update(db,obj,data):

        obj.name=data.name

        obj.latitude=data.latitude

        obj.longitude=data.longitude

        obj.status=data.status

        db.commit()

        db.refresh(obj)

        return obj


    @staticmethod
    def delete(db,obj):

        db.delete(obj)

        db.commit()