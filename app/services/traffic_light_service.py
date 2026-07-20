from sqlalchemy.orm import Session

from app.repositories.traffic_light_repository import TrafficLightRepository


class TrafficLightService:


    @staticmethod
    def get_all(db:Session):

        return TrafficLightRepository.get_all(db)


    @staticmethod
    def get_by_id(db:Session,id:int):

        return TrafficLightRepository.get_by_id(db,id)


    @staticmethod
    def create(db:Session,data):

        return TrafficLightRepository.create(db,data)


    @staticmethod
    def update(db,obj,data):

        return TrafficLightRepository.update(db,obj,data)


    @staticmethod
    def delete(db,obj):

        return TrafficLightRepository.delete(db,obj)