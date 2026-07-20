import json

from app.core.database import SessionLocal
from app.models.pedestrian_crossing import PedestrianCrossing

FILE_PATH = "peshexod.geojson"


def import_geojson():

    db = SessionLocal()
    db.query(PedestrianCrossing).delete()
    db.commit()
    
    with open(FILE_PATH, "r", encoding="utf-8") as f:

        geojson = json.load(f)

    features = geojson["features"]

    print(f"Найдено переходов: {len(features)}")

    counter = 0

    for feature in features:

        props = feature["properties"]

        crossing = PedestrianCrossing(

            street=props.get("Кўча") or "",

            district=props.get("Туман") or "",

            crossing_type=props.get("Тури") or "",

            width=str(props.get("Эни(м)") or ""),

            length=str(props.get("Узунл") or ""),

            geometry=json.dumps(
                feature["geometry"],
                ensure_ascii=False
            )

        )

        db.add(crossing)

        counter += 1

        if counter % 500 == 0:

            print(f"Импортировано {counter}")

    db.commit()

    db.close()

    print(f"\nГотово. Импортировано {counter} переходов.")


if __name__ == "__main__":

    import_geojson()