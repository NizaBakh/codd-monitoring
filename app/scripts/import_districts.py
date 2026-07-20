import json

from app.core.database import SessionLocal
from app.models.district import District

FILE_PATH = "districts.geojson"


def normalize_name(name: str) -> str:

    if not name:
        return ""

    name = (
        name.replace(" tumani", "")
            .replace(" Tumani", "")
            .replace(" тумани", "")
            .replace(" Тумани", "")
            .strip()
    )

    aliases = {

        # Сергели
        "Sirg‘ali": "Сергели",
        "Sirgali": "Сергели",
        "Сирғали": "Сергели",

        # Мирзо Улугбек
        "Mirzo ulug‘bek": "Мирзо Улуғбек",
        "Mirzo ulugbek": "Мирзо Улуғбек",
        "Мирзо улуғбек": "Мирзо Улуғбек",

    }

    return aliases.get(name, name)


def import_geojson():

    db = SessionLocal()

    db.query(District).delete()
    db.commit()

    with open(FILE_PATH, "r", encoding="utf-8") as f:
        geojson = json.load(f)

    features = geojson["features"]

    print(f"Найдено районов: {len(features)}")

    counter = 0

    for feature in features:

        props = feature["properties"]

        district = District(

            name=normalize_name(
                props.get("dist_name", "")
            ),

            name_ru=normalize_name(
                props.get("dist_kir", "")
            ),

            cad_id=str(
                props.get("cad_id", "")
            ),

            geometry=json.dumps(
                feature["geometry"],
                ensure_ascii=False
            )

        )

        db.add(district)

        counter += 1

    db.commit()
    db.close()

    print(f"Импортировано районов: {counter}")


if __name__ == "__main__":

    import_geojson()