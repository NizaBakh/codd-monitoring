import json
from pathlib import Path

from app.core.database import SessionLocal

from app.models.metro_station import MetroStation
from app.models.metro_line import MetroLine


BASE_DIR = Path(__file__).resolve().parents[2]

LINES_FILE = BASE_DIR / "metro_lines.geojson"
STATIONS_FILE = BASE_DIR / "metro_stations.geojson"


def import_geojson():

    db = SessionLocal()

    db.query(MetroStation).delete()
    db.query(MetroLine).delete()

    db.commit()

    # ===========================================================
    # ИМПОРТ ЛИНИЙ
    # ===========================================================

    with open(LINES_FILE, "r", encoding="utf-8") as f:

        lines_geojson = json.load(f)

    line_count = 0

    for feature in lines_geojson["features"]:

        props = feature.get("properties", {})
        geometry = feature.get("geometry")

        if not geometry:
            continue

        line = MetroLine(

            line_id=str(props.get("id", "")),

            name=props.get("name_uz", ""),

            name_ru=props.get("name_ru", ""),

            color=props.get("colour", ""),

            geometry=json.dumps(
                geometry,
                ensure_ascii=False
            )

        )

        db.add(line)

        line_count += 1

    db.commit()

    # ===========================================================
    # ИМПОРТ СТАНЦИЙ
    # ===========================================================

    with open(STATIONS_FILE, "r", encoding="utf-8") as f:

        stations_geojson = json.load(f)

    station_count = 0

    for feature in stations_geojson["features"]:

        props = feature.get("properties", {})
        geometry = feature.get("geometry")

        if not geometry:
            continue

        if geometry["type"] != "Point":
            continue

        lon, lat = geometry["coordinates"]

        station = MetroStation(

            station_id=str(
                props.get(
                    "osm_id",
                    ""
                )
            ),

            name=props.get(
                "name",
                ""
            ),

            name_ru=props.get(
                "name_ru",
                ""
            ),

            line_name=props.get(
                "name_2",
                ""
            ),

            color=props.get(
                "colour",
                ""
            ),

            vestibule=str(
                props.get(
                    "Вести",
                    props.get(
                        "vestibule",
                        ""
                    )
                )
            ),

            station_type=str(
                props.get(
                    "Тури",
                    props.get(
                        "station_type",
                        ""
                    )
                )
            ),

            latitude=lat,

            longitude=lon

        )

        db.add(station)

        station_count += 1

    db.commit()

    db.close()

    print()
    print(f"Линий: {line_count}")
    print(f"Станций: {station_count}")


if __name__ == "__main__":

    import_geojson()