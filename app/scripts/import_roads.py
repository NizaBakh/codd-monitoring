import json

from app.core.database import SessionLocal
from app.models.road import Road

FILE_PATH = "Streets_ID_Geonames_29.01.2026.geojson"


def import_geojson():

    db = SessionLocal()
    db.query(Road).delete()
    db.commit()

    with open(FILE_PATH, "r", encoding="utf-8") as f:

        geojson = json.load(f)

    roads = geojson["features"]

    print(f"Найдено дорог: {len(roads)}")

    counter = 0

    for feature in roads:

        props = feature["properties"]

        geometry = feature["geometry"]

        road = Road(

            name=props.get("Name") or "Без названия",

            district=props.get("Dist_GIS") or "",

            geoname_id=props.get("ID_Geoname") or "",

            geometry=json.dumps(
                geometry,
                ensure_ascii=False
            )

        )

        db.add(road)

        counter += 1

        if counter % 500 == 0:

            print(f"Импортировано {counter}")

    db.commit()

    db.close()

    print()

    print(f"Готово. Импортировано {counter} дорог.")


if __name__ == "__main__":

    import_geojson()