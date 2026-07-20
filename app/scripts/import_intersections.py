import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.intersection import Intersection

BASE_DIR = Path(__file__).resolve().parents[2]

FILE_PATH = BASE_DIR / "intersections.json"


def import_json():

    db = SessionLocal()

    db.query(Intersection).delete()
    db.commit()

    with open(FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # ======================================
    # Показываем структуру первого объекта
    # ======================================
    print("Количество объектов:", len(data))
    print()
    print("Первый объект:")
    print(json.dumps(data[0], indent=4, ensure_ascii=False))


    counter = 0
    added = set()

    for item in data:

        object_id = item["crossroad_id"]

        if object_id in added:
            continue

        added.add(object_id)

        lat, lon = item["crossroad_coordinates"].split(",")

        intersection = Intersection(

            object_id=object_id,

            name=item.get("crossroad_street_name", ""),

            district=item.get("district_name", ""),

            latitude=float(lat),

            longitude=float(lon)

        )

        db.add(intersection)

        counter += 1

        if counter % 500 == 0:
            print(counter)

    db.commit()
    db.close()

    print(f"Импортировано {counter} перекрёстков")


if __name__ == "__main__":
    import_json()