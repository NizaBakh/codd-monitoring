import json

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.bus_route import BusRoute


def import_routes():

    db: Session = SessionLocal()

    with open("bus_trace.geojson", "r", encoding="utf-8") as f:
        data = json.load(f)

    db.query(BusRoute).delete()

    count = 0

    for feature in data["features"]:

        props = feature["properties"]

        geometry = feature["geometry"]

        route = BusRoute(

            route_number=props.get("route_number"),

            name=props.get("name"),

            geometry=json.dumps(geometry)

        )

        db.add(route)

        count += 1

    db.commit()

    db.close()

    print(f"Импортировано {count} маршрутов")


if __name__ == "__main__":
    import_routes()