import json
from pathlib import Path

from app.core.database import SessionLocal
from app.models.traffic_light import TrafficLight


BASE_DIR = Path(__file__).resolve().parents[2]

FILE_PATH = BASE_DIR / "merged.geojson"


def import_geojson():

    db = SessionLocal()

    try:

        # ==========================================
        # ОЧИЩАЕМ СТАРЫЕ ДАННЫЕ
        # ==========================================

        db.query(TrafficLight).delete()

        db.commit()


        # ==========================================
        # GEOJSON
        # ==========================================

        with open(
            FILE_PATH,
            "r",
            encoding="utf-8"
        ) as f:

            data = json.load(f)


        count = 0


        # ==========================================
        # IMPORT
        # ==========================================

        for feature in data.get("features", []):

            geometry = feature.get("geometry")

            properties = feature.get(
                "properties",
                {}
            )


            if not geometry:
                continue


            coordinates = geometry.get(
                "coordinates"
            )


            if not coordinates:
                continue


            if len(coordinates) < 2:
                continue


            # GeoJSON:
            # [longitude, latitude]

            longitude = coordinates[0]

            latitude = coordinates[1]


            # ======================================
            # ДАННЫЕ
            # ======================================

            name = (
                properties.get("Адрес")
                or properties.get("Name")
                or properties.get("name")
                or "Без названия"
            )


            district = (
                properties.get("Туман")
                or ""
            )


            mahalla = (
                properties.get("mahalla")
                or ""
            )


            owner = (
                properties.get("Прина")
                or ""
            )


            # ======================================
            # ID ИСТОЧНИКА
            # ======================================

            source_id = (
                properties.get("osm_id")
                or properties.get("ID")
                or properties.get("id")
                or ""
            )


            # ======================================
            # TRAFFIC LIGHT
            # ======================================

            traffic = TrafficLight(

                osm_id=str(source_id),

                name=str(name),

                district=str(district),

                mahalla=str(mahalla),

                owner=str(owner),

                latitude=float(latitude),

                longitude=float(longitude),

                status="ACTIVE"

            )


            db.add(traffic)

            count += 1


        # ==========================================
        # COMMIT
        # ==========================================

        db.commit()


        print(
            f"Импортировано {count} светофоров"
        )


    except Exception:

        db.rollback()

        raise


    finally:

        db.close()


if __name__ == "__main__":

    import_geojson()