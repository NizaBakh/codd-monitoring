import json
from pathlib import Path

from shapely.geometry import Point, shape

BASE_DIR = Path(__file__).resolve().parents[2]

DISTRICT_FILE = BASE_DIR / "districts.geojson"

with open(DISTRICT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

DISTRICTS = []

for feature in data["features"]:

    DISTRICTS.append(

        {

            "polygon": shape(feature["geometry"]),

            "name": feature["properties"]["dist_name"]

        }

    )


def detect_district(lat, lon):
    point = Point(lon, lat)

    for district in DISTRICTS:
        if district["polygon"].contains(point):
            return district["name"]

    return "Не определён"