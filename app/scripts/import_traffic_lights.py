import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.traffic_light import TrafficLight


BASE_DIR = Path(__file__).resolve().parents[2]

FILE_PATH = BASE_DIR / "data_traffic_lights.geojson"


def import_geojson():

    db = SessionLocal()
    db.query(TrafficLight).delete()
    db.commit()
    
    with open(FILE_PATH, "r", encoding="utf-8") as f:

        data = json.load(f)

    count = 0

    for feature in data["features"]:

        props = feature["properties"]

        lon, lat = feature["geometry"]["coordinates"]

        traffic = TrafficLight(

            osm_id=str(props.get("osm_id", "")),

            name=props.get("Name", "Без названия"),

            district=props.get("Туман", ""),

            mahalla=props.get("mahalla", ""),

            latitude=lat,

            longitude=lon,

            status="ACTIVE"

        )

        db.add(traffic)

        count += 1

    db.commit()

    db.close()

    print(f"Импортировано {count} светофоров")


if __name__ == "__main__":

    import_geojson()