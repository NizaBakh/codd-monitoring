import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.bicycle_lane import BicycleLane

BASE_DIR = Path(__file__).resolve().parents[2]

GEOJSON = BASE_DIR / "cycleways-existing (1).geojson"

db = SessionLocal()
if db.query(BicycleLane).count() > 0:
    print("Велодорожки уже импортированы")
    db.close()
    exit()
db.query(BicycleLane).delete()
db.commit()

with open(GEOJSON, encoding="utf-8") as f:

    data = json.load(f)

print(f"Найдено {len(data['features'])} объектов")

count = 0

for feature in data["features"]:

    props = feature["properties"]
    geometry = feature["geometry"]

    if geometry["type"] == "LineString":

        lon, lat = geometry["coordinates"][0]

    elif geometry["type"] == "MultiLineString":

        lon, lat = geometry["coordinates"][0][0]

    else:

        continue
    

    lane = BicycleLane(

        osm_id=str(props.get("osm_id")),
        district=props.get("Туман"),

        class_name=props.get("class"),

        class_label=props.get("class_label_ru"),

        status=props.get("status"),

        length=float(props.get("length_m") or 0),

        surface=props.get("surface"),

        segregated=props.get("segregated"),

        lit=props.get("lit"),

        latitude=lat,

        longitude=lon,

        geometry=json.dumps(feature["geometry"], ensure_ascii=False)

    )

    db.add(lane)

    count += 1

db.commit()

db.close()

print(f"Импортировано {count} велодорожек")