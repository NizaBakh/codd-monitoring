from sqlalchemy import create_engine, text

engine = create_engine("sqlite:///./codd.db")

tables = [

    "traffic_lights",
    "bus_stops",
    "roads",
    "pedestrian_crossings",
    "districts",
    "intersections",

    # Метро
    "metro_stations",
    "metro_lines"

]

with engine.connect() as conn:

    for table in tables:

        try:

            count = conn.execute(

                text(f"SELECT COUNT(*) FROM {table}")

            ).scalar()

            print(f"{table}: {count}")

        except Exception as e:

            print(f"{table}: ERROR -> {e}")