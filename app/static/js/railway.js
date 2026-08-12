console.log("RAILWAY JS LOADED");

if (!window.location.pathname.includes("railway")) {
    throw new Error("Railway page only");
}

const railwayLinesLayer = L.layerGroup().addTo(map);
const railwayStationsLayer = L.layerGroup().addTo(map);

let railwayStations = [];
let railwayLines = [];

/* =====================================================
   STYLE
===================================================== */

function railwayColor() {
    return "#1976d2";
}

/* =====================================================
   RAILWAY LINES
===================================================== */

async function loadRailwayLines() {

    console.log("Loading railway lines...");

    const response = await fetch("/api/railway-lines");

    if (!response.ok) {
        console.error("Railway lines API error:", response.status);
        return;
    }

    railwayLines = await response.json();

    console.log("Railway lines:", railwayLines);

    railwayLinesLayer.clearLayers();

    railwayLines.forEach(line => {

        let geometry = line.geometry;

        if (typeof geometry === "string") {
            geometry = JSON.parse(geometry);
        }

        const geoLayer = L.geoJSON(geometry, {
            style: {
                color: railwayColor(),
                weight: 4,
                opacity: 0.9
            }
        });

        geoLayer.bindPopup(`
            <b>🛤 ${line.name}</b>
        `);

        railwayLinesLayer.addLayer(geoLayer);

    });

    const counter = document.getElementById("lineCount");

    if (counter) {
        counter.textContent = railwayLines.length;
    }

    console.log(
        "Railway lines loaded:",
        railwayLinesLayer.getLayers().length
    );
}

/* =====================================================
   RAILWAY STATIONS
===================================================== */

async function loadRailwayStations() {

    console.log("Loading railway stations...");

    const response = await fetch("/api/railway-stations");

    if (!response.ok) {
        console.error("Railway stations API error:", response.status);
        return;
    }

    railwayStations = await response.json();

    console.log("Railway stations:", railwayStations);

    railwayStationsLayer.clearLayers();

    railwayStations.forEach(station => {

        const marker = L.circleMarker(
            [station.latitude, station.longitude],
            {
                radius: 6,
                color: "#d32f2f",
                fillColor: "#d32f2f",
                fillOpacity: 1,
                weight: 2
            }
        );

        marker.bindPopup(`
            <b>🚉 ${station.name}</b><br>
            Код: ${station.code}
        `);

        railwayStationsLayer.addLayer(marker);

    });

    const counter = document.getElementById("stationCount");

    if (counter) {
        counter.textContent = railwayStations.length;
    }

    console.log(
        "Railway stations loaded:",
        railwayStationsLayer.getLayers().length
    );
}

/* =====================================================
   START
===================================================== */

window.addEventListener("load", async () => {

    await loadRailwayLines();

    await loadRailwayStations();

    console.log(
        "Map has railway lines:",
        map.hasLayer(railwayLinesLayer)
    );

    console.log(
        "Map has railway stations:",
        map.hasLayer(railwayStationsLayer)
    );

});