/* =====================================================
   BICYCLE LANES
===================================================== */

let bicycleLanes = [];

/* =====================================================
   INIT
===================================================== */

async function initBicycleLanes() {

    await loadBicycleLanes();

    showOnlyLayer(window.bicycleLaneLayer);

    updateBicycleLaneAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadBicycleLanes() {

    try {

        const response = await fetch("/api/bicycle-lanes/");

        if (!response.ok)
            throw new Error("Bicycle Lane API");

        bicycleLanes = await response.json();

        window.bicycleLaneLayer.clearLayers();

        const counter = document.getElementById("bicycleLaneCount");

        if (counter)
            counter.innerHTML = bicycleLanes.length;

        bicycleLanes.forEach(item => {

            if (!item.geometry)
                return;

            const geometry = JSON.parse(item.geometry);

            const layer = L.geoJSON(geometry, {

                style: {

                    color: "#00c853",

                    weight: 5,

                    opacity: 0.9

                }

            });

            layer.bindPopup(`
                <b>🚴 ${item.class_label}</b><br>
                <b>Статус:</b> ${item.status}<br>
                <b>Покрытие:</b> ${item.surface}<br>
                <b>Освещение:</b> ${item.lit}<br>
                <b>Разделение:</b> ${item.segregated}<br>
                <b>Длина:</b> ${item.length.toFixed(1)} м
            `);

            window.bicycleLaneLayer.addLayer(layer);

        });

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterBicycleLanes(district) {

    window.bicycleLaneLayer.clearLayers();

    let count = 0;

    bicycleLanes.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        count++;

        if (!item.geometry)
            return;

        const geometry = JSON.parse(item.geometry);

        const layer = L.geoJSON(geometry, {

            style: {

                color: "#00c853",

                weight: 5,

                opacity: 0.9

            }

        });

        layer.bindPopup(`
            <b>🚴 ${item.class_label}</b><br>
            <b>Статус:</b> ${item.status}<br>
            <b>Покрытие:</b> ${item.surface}<br>
            <b>Освещение:</b> ${item.lit}<br>
            <b>Разделение:</b> ${item.segregated}<br>
            <b>Длина:</b> ${item.length.toFixed(1)} м
        `);

        window.bicycleLaneLayer.addLayer(layer);

    });

    const counter = document.getElementById("bicycleLaneCount");

    if (counter)
        counter.innerHTML = count;

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateBicycleLaneAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = bicycleLanes;

    }

    else {

        selected = bicycleLanes.filter(item =>
            districtMatch(item.district, district)
        );

    }

    const districtName = document.getElementById("selectedDistrict");

    if (districtName) {

        districtName.innerHTML =
            (!district || (!district.name && !district.name_ru))
                ? "Весь город"
                : (district.name_ru || district.name);

    }

    const count = document.getElementById("bicycleLaneCount");

    if (count)
        count.innerHTML = selected.length;

    const total = selected.reduce((s, x) => s + (x.length || 0), 0);

    const length = document.getElementById("bicycleLaneLength");

    if (length) {

        length.innerHTML = (total / 1000).toFixed(2) + " км";

    }

    const types = document.getElementById("bicycleLaneTypes");

    if (types) {

        const main = selected.filter(x =>
            x.class_label === "Основная велодорожка"
        ).length;

        const crossing = selected.filter(x =>
            x.class_label === "Велопереход"
        ).length;

        const mixed = selected.filter(x =>
            x.class_label === "Совмещённая дорожка / тротуар"
        ).length;

        types.innerHTML = `
            🚴 Основная — ${main}<br>
            🚶 Велопереход — ${crossing}<br>
            🚴🚶 Совмещённая — ${mixed}
        `;

    }


}