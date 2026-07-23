import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.bridge_tunnel import BridgeTunnel

print("Старт импорта...")

BASE_DIR = Path(__file__).resolve().parents[2]
GEOJSON = BASE_DIR / "bridges_tunnels.geojson"

db = SessionLocal()

with open(GEOJSON, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Найдено объектов: {len(data['features'])}")

count = 0

for feature in data["features"]:

    props = feature["properties"]

    geometry = feature.get("geometry")

    if not geometry:
        continue

    if geometry["type"] != "MultiLineString":
        continue

    coords = geometry["coordinates"]

    if not coords:
        continue

    first_line = coords[0]

    if not first_line:
        continue

    lon, lat = first_line[0]

    item = BridgeTunnel(

        osm_id=str(props.get("osm_id")),

        full_id=props.get("full_id"),

        district=props.get("Туман"),

        address=props.get("Адрес"),

        structure_type=props.get("Тури"),

        length=float(props.get("Узунл") or 0),

        latitude=lat,

        longitude=lon

    )

    db.add(item)

    count += 1

print(f"Подготовлено к импорту: {count}")

db.commit()

print("Commit выполнен")

db.close()

print(f"Импортировано {count} сооружений")