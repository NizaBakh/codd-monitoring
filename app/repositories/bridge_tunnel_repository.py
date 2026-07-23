from sqlalchemy.orm import Session

from app.models.bridge_tunnel import BridgeTunnel


class BridgeTunnelRepository:

    @staticmethod
    def get_all(db: Session):

        return (

            db.query(BridgeTunnel)

            .order_by(BridgeTunnel.id)

            .all()

        )