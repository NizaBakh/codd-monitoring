import json

from app.core.database import SessionLocal
from app.models.bus_stop import BusStop


def import_geojson():

    db = SessionLocal()

    with open(
        "data_public_transport_stops.geojson",
        "r",
        encoding="utf-8"
    ) as f:

        data = json.load(f)

    # очищаем таблицу перед новым импортом
    db.query(BusStop).delete()

    count = 0

    for feature in data["features"]:

        props = feature["properties"]

        lon, lat = feature["geometry"]["coordinates"]

        stop = BusStop(

            stop_uid=str(props.get("stop_uid", "")),
            ivms_id=str(props.get("ivms_id", "")),

            name=props.get("stop_name", ""),
            district=props.get("district_name", ""),
            street_name=props.get("street_name", ""),

            organization_raw=props.get("organization_raw", ""),

            construction_raw=props.get("construction_raw", ""),
            construction_type=props.get("construction_type", ""),
            construction_count=int(props.get("construction_count") or 0),

            has_platform=bool(props.get("has_platform")),
            has_shelter=bool(props.get("has_shelter")),
            has_bench=bool(props.get("has_bench")),
            has_ramp=bool(props.get("has_ramp")),
            has_bin=bool(props.get("has_bin")),
            has_info_board=bool(props.get("has_info_board")),

            bus_routes_raw=props.get("bus_routes_raw", ""),

            last_inspection_at=str(props.get("last_inspection_at", "")),

            latitude=lat,
            longitude=lon

        )

        db.add(stop)

        count += 1

    db.commit()
    db.close()

    print(f"Импортировано {count} остановок")


if __name__ == "__main__":

    import_geojson()