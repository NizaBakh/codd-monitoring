/* =====================================================
   PARKINGS
===================================================== */


/* =====================================================
   INIT
===================================================== */

async function initParkings() {

    await loadParkings();

    showOnlyLayer(window.parkingLayer);

    updateParkingAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadParkings() {

    try {

        const response = await fetch("/api/parkings/");

        if (!response.ok)
            throw new Error("Parking API");

        parkings = await response.json();

        window.parkingLayer.clearLayers();

        const counter = document.getElementById("parkingCount");

        if (counter)
            counter.innerHTML = parkings.length;

        parkings.forEach(item => {

            if (!item.geometry)
                return;

            const geometry = JSON.parse(item.geometry);

            const layer = L.geoJSON(geometry, {

                style: {

                    color: "#1976d2",

                    weight: 2,

                    fillColor: "#64b5f6",

                    fillOpacity: 0.5

                }

            });

            layer.bindPopup(`
                <b>🅿 Парковка</b><br>
                <b>Район:</b> ${item.district}<br>
                <b>Площадь:</b> ${item.area} га
            `);

            window.parkingLayer.addLayer(layer);

        });

    }

    catch (e) {

        console.error(e);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterParkings(district) {

    window.parkingLayer.clearLayers();

    let selected = [];

    parkings.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        selected.push(item);

        const geometry = JSON.parse(item.geometry);

        const layer = L.geoJSON(geometry, {

            style: {

                color: "#1976d2",

                weight: 2,

                fillColor: "#64b5f6",

                fillOpacity: 0.5

            }

        });

        layer.bindPopup(`
            <b>🅿 Парковка</b><br>
            <b>Район:</b> ${item.district}<br>
            <b>Площадь:</b> ${item.area} га
        `);

        window.parkingLayer.addLayer(layer);

    });

    updateParkingAnalytics(district, selected);

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateParkingAnalytics(district = null, selected = null) {

    if (!selected) {

        if (!district || (!district.name && !district.name_ru)) {

            selected = parkings;

        } else {

            selected = parkings.filter(item =>
                districtMatch(item.district, district)
            );

        }

    }

    document.getElementById("selectedDistrict").innerHTML =
        district ? (district.name_ru || district.name) : "Весь город";

    document.getElementById("parkingCount").innerHTML =
        selected.length;

    const totalArea = selected.reduce((sum, x) => sum + (x.area || 0), 0);

    document.getElementById("parkingArea").innerHTML =
        totalArea.toFixed(2) + " га";

}