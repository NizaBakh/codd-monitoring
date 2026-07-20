/* =====================================================
   PEDESTRIAN CROSSINGS
===================================================== */

async function initPedestrianCrossings() {

    await loadPedestrianCrossings();

    showOnlyLayer(pedestrianLayer);

    console.log("pedestrian:", pedestrianCrossings.length);

    updatePedestrianAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadPedestrianCrossings() {

    try {

        const response = await fetch("/api/pedestrian-crossings/");

        if (!response.ok)
            throw new Error("Pedestrian API");

        pedestrianCrossings = await response.json();

        pedestrianLayer.clearLayers();

        const counter = document.getElementById("crossingCount");

        if (counter)
            counter.innerHTML = pedestrianCrossings.length;

        pedestrianCrossings.forEach(crossing => {

            const geometry = safeJSON(crossing.geometry);

            if (!geometry)
                return;

            const layer = L.geoJSON(geometry, {

                style: {

                    color: "#9c27b0",

                    weight: 4,

                    opacity: 1

                }

            });

            layer.bindPopup(

                popup(

                    `🚶 ${crossing.street}`,

                    `
                    <b>Тип:</b> ${crossing.crossing_type}<br>
                    <b>Район:</b> ${crossing.district}<br>
                    <b>Ширина:</b> ${crossing.width} м<br>
                    <b>Длина:</b> ${crossing.length} м
                    `

                )

            );

            pedestrianLayer.addLayer(layer);

        });

    }

    catch (e) {

        console.error(e);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterPedestrianCrossings(district) {

    pedestrianLayer.clearLayers();

    const selected = [];

    pedestrianCrossings.forEach(crossing => {

        if (!districtMatch(crossing.district, district))
            return;

        const geometry = safeJSON(crossing.geometry);

        if (!geometry)
            return;

        selected.push(crossing);

        const layer = L.geoJSON(geometry, {

            style: {

                color: "#9c27b0",

                weight: 4,

                opacity: 1

            }

        });

        layer.bindPopup(

            popup(

                `🚶 ${crossing.street}`,

                `
                <b>Тип:</b> ${crossing.crossing_type}<br>
                <b>Ширина:</b> ${crossing.width} м<br>
                <b>Длина:</b> ${crossing.length} м
                `

            )

        );

        pedestrianLayer.addLayer(layer);

    });

    const counter = document.getElementById("crossingCount");

    if (counter)
        counter.innerHTML = selected.length;

    updatePedestrianAnalytics(district, selected);
    showOnlyLayer(pedestrianLayer);
}

/* =====================================================
   ANALYTICS
===================================================== */

function updatePedestrianAnalytics(district = null, selected = null) {

    if (!selected) {

        if (!district) {

            selected = pedestrianCrossings;

        } else {

            selected = pedestrianCrossings.filter(item =>
                districtMatch(item.district, district)
            );

        }

    }

    const districtName = document.getElementById("selectedDistrict");

    if (districtName) {

        districtName.innerHTML = district
            ? (district.name_ru || district.name)
            : "Весь город";

    }

    const crossingCount = document.getElementById("districtCrossingCount");

    if (crossingCount) {

        crossingCount.innerHTML = selected.length;

    }

    const types = {};

    selected.forEach(item => {

        if (item.crossing_type) {

            types[item.crossing_type] =
                (types[item.crossing_type] || 0) + 1;

        }

    });

    const typeInfo = document.getElementById("crossingTypes");

    if (typeInfo) {

        typeInfo.innerHTML =

            Object.entries(types)
                .map(x => `${x[0]} : ${x[1]}`)
                .join("<br>") || "—";

    }

}