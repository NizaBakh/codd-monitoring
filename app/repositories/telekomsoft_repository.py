from sqlalchemy.orm import Session

from app.models.telekomsoft import Telekomsoft


class TelekomsoftRepository:

    @staticmethod
    def get_all(db: Session):

        return (

            db.query(Telekomsoft)

            .order_by(Telekomsoft.object_number)

            .all()

        )