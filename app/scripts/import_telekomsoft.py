import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.telekomsoft import Telekomsoft
from app.utils.district_detector import detect_district

print("Старт импорта Telekomsoft...")

BASE_DIR = Path(__file__).resolve().parents[2]

GEOJSON = BASE_DIR / "telecomsoft.geojson"

db = SessionLocal()

if db.query(Telekomsoft).count() > 0:

    print("Telekomsoft уже импортирован")

    db.close()

    exit()

with open(GEOJSON, "r", encoding="utf-8") as f:

    data = json.load(f)
print(GEOJSON)
print(data.keys())
objects = data["objects"]

count = 0

for obj in objects:

    lat = obj["location"]["lat"]
    lon = obj["location"]["lon"]

    district = detect_district(lat, lon)
    if district == "Sirg‘ali tumani":
        district = "Sergeli tumani"

    if district == "Mirzo Ulug‘bek tumani":
        district = "Mirzo Ulugbek tumani"

    item = Telekomsoft(

        object_number=obj["id"],

        object_type=obj["object_type"]["label"],

        district=district,

        address=obj["address"],

        latitude=lat,

        longitude=lon,

        construction_status=obj["statuses"]["construction"]["label"],

        system_visibility=obj["statuses"]["system_visibility"]["label"],

        controller_status=obj["statuses"]["controller"]["label"],

        entrepreneur=obj["statuses"]["has_entrepreneur"]["label"]

    )

    db.add(item)

    count += 1

db.commit()

db.close()

print(f"Импортировано {count} объектов Telekomsoft")