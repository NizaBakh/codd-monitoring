from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.bridge_tunnel_service import BridgeTunnelService

router = APIRouter(
    prefix="/api/bridge-tunnels",
    tags=["Bridge Tunnels"]
)


@router.get("/")

def get_bridge_tunnels(db: Session = Depends(get_db)):

    return BridgeTunnelService.get_all(db)