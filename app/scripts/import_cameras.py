import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.camera import Camera

print("Старт импорта камер...")

BASE_DIR = Path(__file__).resolve().parents[2]
GEOJSON = BASE_DIR / "converted.geojson"

db = SessionLocal()

if db.query(Camera).count() > 0:
    print("Камеры уже импортированы")
    db.close()
    exit()

with open(GEOJSON, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Найдено объектов: {len(data['features'])}")

count = 0

for feature in data["features"]:

    props = feature["properties"]

    lon, lat = feature["geometry"]["coordinates"]

    camera = Camera(

        number=int(props.get("№", 0)),

        district=props.get("Tuman nomi"),

        address=props.get("Manzil"),

        latitude=lat,

        longitude=lon

    )

    db.add(camera)

    count += 1

db.commit()

db.close()

print(f"Импортировано {count} камер")