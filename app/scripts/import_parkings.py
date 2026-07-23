import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.parking import Parking

BASE_DIR = Path(__file__).resolve().parents[2]

GEOJSON = BASE_DIR / "Парковки OSM_Низом.geojson"

db = SessionLocal()
if db.query(Parking).count() > 0:
    print("Парковки уже импортированы")
    db.close()
    exit()

# очищаем таблицу
db.query(Parking).delete()
db.commit()

with open(GEOJSON, encoding="utf-8") as f:
    data = json.load(f)

print(f"Найдено {len(data['features'])} объектов")

count = 0

for feature in data["features"]:

    props = feature["properties"]

    geometry = feature["geometry"]

    # Берём первую координату независимо от типа геометрии
    if geometry["type"] == "Point":

        lon, lat = geometry["coordinates"]

    elif geometry["type"] == "Polygon":

        lon, lat = geometry["coordinates"][0][0]

    elif geometry["type"] == "MultiPolygon":

        lon, lat = geometry["coordinates"][0][0][0]

    else:
        continue

    parking = Parking(

        osm_id=str(props.get("osm_id") or props.get("id")),

        district=props.get("Туман"),

        area=float(props.get("Площадь") or 0),

        latitude=lat,

        longitude=lon,

        geometry=json.dumps(geometry, ensure_ascii=False)

    )

    db.add(parking)

    count += 1

db.commit()
db.close()

print(f"Импортировано {count} парковок")