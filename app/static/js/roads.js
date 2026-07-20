/* =====================================================
   ROADS
===================================================== */

async function initRoads() {

    await loadRoads();

    showOnlyLayer(roadsLayer);

    console.log("roads:", roads.length);

    updateRoadAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadRoads() {

    try {

        const response = await fetch("/api/roads/");

        if (!response.ok)
            throw new Error("Road API");

        roads = await response.json();

        roadsLayer.clearLayers();

        const counter = document.getElementById("roadCount");

        if (counter)
            counter.innerHTML = roads.length;

        roads.forEach(road => {

            const geometry = safeJSON(road.geometry);

            if (!geometry)
                return;

            const layer = L.geoJSON(geometry, {

                style: {

                    color: "#3b82f6",

                    weight: 2,

                    opacity: 0.9

                }

            });

            layer.bindPopup(

                popup(

                    `🛣 ${road.name}`,

                    `
                    <b>Район:</b> ${road.district}<br>
                    <b>Категория:</b> ${road.category || "-"}<br>
                    <b>Длина:</b> ${road.length || "-"} м
                    `

                )

            );

            roadsLayer.addLayer(layer);

        });

    }

    catch (e) {

        console.error(e);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterRoads(district) {

    roadsLayer.clearLayers();

    const selected = [];

    roads.forEach(road => {

        if (!districtMatch(road.district, district))
            return;

        selected.push(road);

        const geometry = safeJSON(road.geometry);

        if (!geometry)
            return;

        const layer = L.geoJSON(geometry, {

            style: {

                color: "#3b82f6",

                weight: 3,

                opacity: 1

            }

        });

        layer.bindPopup(

            popup(

                `🛣 ${road.name}`,

                `
                <b>Категория:</b> ${road.category || "-"}<br>
                <b>Длина:</b> ${road.length || "-"} м
                `

            )

        );

        roadsLayer.addLayer(layer);

    });

    const counter = document.getElementById("roadCount");

    if (counter)
        counter.innerHTML = selected.length;

    updateRoadAnalytics(district, selected);
    showOnlyLayer(roadsLayer);
}   

/* =====================================================
   ANALYTICS
===================================================== */

function updateRoadAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = roads;

    } else {

        selected = roads.filter(road =>
            districtMatch(road.district, district)
        );

    }

    document.getElementById("selectedDistrict").innerHTML =
        district ? (district.name_ru || district.name) : "Весь город";

    document.getElementById("districtRoadCount").innerHTML =
        selected.length;

}