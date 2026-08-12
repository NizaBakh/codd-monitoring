import json

from app.core.database import SessionLocal
from app.models.railway_line import RailwayLine


def import_lines():

    db = SessionLocal()

    db.query(RailwayLine).delete()

    with open(
        "Линия.geojson",
        "r",
        encoding="utf-8"
    ) as f:

        data = json.load(f)

    count = 0

    for i, feature in enumerate(data["features"], start=1):

        props = feature["properties"]

        geometry = feature["geometry"]

        line = RailwayLine(

            name=props.get("Тип") or f"ЖД линия {i}",

            length=None,

            geometry=json.dumps(
                geometry,
                ensure_ascii=False
            )

        )

        db.add(line)

        count += 1

    db.commit()
    db.close()

    print(f"Импортировано {count} линий")


if __name__ == "__main__":
    import_lines()