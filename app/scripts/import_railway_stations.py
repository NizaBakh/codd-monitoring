import json

from app.core.database import SessionLocal
from app.models.railway_station import RailwayStation


def import_stations():

    db = SessionLocal()

    db.query(RailwayStation).delete()

    with open(
        "Станции.geojson",
        "r",
        encoding="utf-8"
    ) as f:

        data = json.load(f)

    count = 0

    for feature in data["features"]:

        props = feature["properties"]

        lon, lat = feature["geometry"]["coordinates"]

        station = RailwayStation(

            code=props.get("CODE"),

            name=props.get("NAME"),

            latitude=lat,

            longitude=lon

        )

        db.add(station)

        count += 1

    db.commit()
    db.close()

    print(f"Импортировано {count} станций")


if __name__ == "__main__":
    import_stations()