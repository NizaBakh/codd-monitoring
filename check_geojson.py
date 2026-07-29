import json
from collections import Counter


with open(
    "telecomsoft.geojson",
    "r",
    encoding="utf-8"
) as f:
    data = json.load(f)


districts = []

for obj in data["objects"]:

    district = obj.get("district")

    if district:
        name = district.get("name")

        if name:
            districts.append(name)


print(Counter(districts))