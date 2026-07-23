from sqlalchemy.orm import Session

from app.repositories.bridge_tunnel_repository import BridgeTunnelRepository


class BridgeTunnelService:

    @staticmethod
    def get_all(db: Session):

        return BridgeTunnelRepository.get_all(db)