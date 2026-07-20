from app.core.database import DATABASE_URL

print(DATABASE_URL)

import os

print(os.path.abspath("codd.db"))

from sqlalchemy.orm import Session
from shapely.geometry import Point, shape
import json

from app.core.database import SessionLocal
from app.models.bus_stop import BusStop
from app.models.district import District


def assign():

    db: Session = SessionLocal()
    from sqlalchemy import text

    result = db.execute(text("PRAGMA table_info(bus_stops)")).fetchall()

    print(result)

    return

    districts = db.query(District).all()
    stops = db.query(BusStop).all()

    updated = 0

    for stop in stops:

        point = Point(stop.longitude, stop.latitude)

        for district in districts:

            geometry = json.loads(district.geometry)

            polygon = shape(geometry)

            if polygon.contains(point):

                stop.district = district.name

                updated += 1

                break

    db.commit()

    print(f"Updated: {updated}")

    db.close()


if __name__ == "__main__":

    assign()