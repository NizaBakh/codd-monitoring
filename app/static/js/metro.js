/* =====================================================
   METRO
===================================================== */

let metroStations = [];
let metroLines = [];

/* =====================================================
   LAYERS
===================================================== */

const metroStationsLayer = L.layerGroup();
const metroLinesLayer = L.layerGroup();

map.addLayer(metroLinesLayer);
map.addLayer(metroStationsLayer);

/* =====================================================
   LOAD STATIONS
===================================================== */

async function loadMetroStations() {

    try {

        const response = await fetch("/api/metro/stations");

        if (!response.ok)
            throw new Error("Metro Stations API");

        metroStations = await response.json();

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   LOAD LINES
===================================================== */

async function loadMetroLines() {

    try {

        const response = await fetch("/api/metro/lines");

        if (!response.ok)
            throw new Error("Metro Lines API");

        metroLines = await response.json();

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   INIT
===================================================== */

async function initMetro() {

    await loadMetroLines();

    await loadMetroStations();

    drawMetroLines();

    drawMetroStations();

    updateMetroAnalytics();

}
/* =====================================================
   DRAW LINES
===================================================== */

function drawMetroLines() {

    metroLinesLayer.clearLayers();

    metroLines.forEach(line => {

        const geometry = safeJSON(line.geometry);

        if (!geometry)
            return;

        const layer = L.geoJSON(

            geometry,

            {

                style: {

                    color: line.color || "#ff0000",

                    weight: 6,

                    opacity: 0.9

                }

            }

        );

        layer.bindPopup(

            popup(

                `🚇 ${line.name_ru || line.name}`,

                `

                <b>Линия:</b> ${line.name_ru || line.name}<br>

                <b>Цвет:</b>
                <span style="
                    display:inline-block;
                    width:16px;
                    height:16px;
                    border-radius:50%;
                    background:${line.color};
                    border:1px solid #000;
                "></span>

                `

            )

        );

        layer.on(

            "click",

            function () {

                selectMetroLine(line);

            }

        );

        metroLinesLayer.addLayer(layer);

    });

}
/* =====================================================
   METRO ICON
===================================================== */

const metroIcon = L.icon({

    iconUrl: "/static/images/markers/metro.png",

    iconSize: [28, 28],

    iconAnchor: [14, 28],

    popupAnchor: [0, -28]

});


/* =====================================================
   DRAW STATIONS
===================================================== */
function drawMetroStations() {

    metroStationsLayer.clearLayers();

    metroStations.forEach(station => {

        const marker = L.marker(
            [station.latitude, station.longitude],
            {
                icon: metroIcon
            }
        );

        marker.bindPopup(

            popup(

                `🚇 ${station.name_ru || station.name}`,

                `
                <b>Станция:</b> ${station.name_ru || station.name}<br>
                <b>Линия:</b> ${station.line_name || "Не определена"}<br>
                <b>Вестибюлей:</b> ${station.vestibule || "-"}<br>
                <b>Тип:</b> ${station.station_type || "-"}
                `

            )

        );

        metroStationsLayer.addLayer(marker);

    });

}

/* =====================================================
   SELECT LINE
===================================================== */
/* =====================================================
   SELECT LINE
===================================================== */


function selectMetroLine(line) {

    metroStationsLayer.clearLayers();
    metroLinesLayer.clearLayers();

    const geometry = safeJSON(line.geometry);

    if (geometry) {

        const layer = L.geoJSON(geometry, {

            style: {

                color: line.color || "#ff0000",

                weight: 8,

                opacity: 1

            }

        });

        metroLinesLayer.addLayer(layer);

        map.fitBounds(layer.getBounds(), {

            padding: [30, 30]

        });

    }

    let count = 0;

    const currentLine = (line.name || "")
        .toLowerCase()
        .trim();

    metroStations.forEach(station => {

        const stationLine = (station.line_name || "")
            .toLowerCase()
            .trim();

        if (stationLine !== currentLine)
            return;

        count++;

        const marker = L.marker(

            [

                station.latitude,

                station.longitude

            ],

            {

                icon: metroIcon

            }

        );

        marker.bindPopup(

            popup(

                `🚇 ${station.name_ru || station.name}`,

                `

                <b>Линия:</b> ${station.line_name}<br>

                <b>Тип:</b> ${station.station_type}<br>

                <b>Вестибюлей:</b> ${station.vestibule}

                `

            )

        );

        metroStationsLayer.addLayer(marker);

    });

    console.log("Линия:", currentLine);
    console.log("Найдено станций:", count);

    updateMetroAnalytics(

        line.name_ru || line.name,

        count

    );

}

/* =====================================================
   SELECT BY NAME
===================================================== */

function selectMetroLine(line) {

    metroStationsLayer.clearLayers();
    metroLinesLayer.clearLayers();

    const geometry = safeJSON(line.geometry);

    if (geometry) {

        const layer = L.geoJSON(geometry, {

            style: {

                color: line.color || "#ff0000",

                weight: 8,

                opacity: 1

            }

        });

        metroLinesLayer.addLayer(layer);

        map.fitBounds(layer.getBounds(), {

            padding: [30, 30]

        });

    }

    let count = 0;

    metroStations.forEach(station => {

        const sameLine =

            station.line_name &&
            line.name &&
            station.line_name.toLowerCase().trim() === line.name.toLowerCase().trim();

        if (!sameLine)
            return;

        count++;

        const marker = L.marker(

            [

                station.latitude,

                station.longitude

            ],

            {

                icon: metroIcon

            }

        );

        marker.bindPopup(

            popup(

                `🚇 ${station.name_ru || station.name}`,

                `

                <b>Линия:</b> ${station.line_name}<br>

                <b>Тип станции:</b> ${station.station_type}<br>

                <b>Вестибюли:</b> ${station.vestibule}

                `

            )

        );

        metroStationsLayer.addLayer(marker);

    });

    console.log("Линия:", line.name);
    console.log("Станций найдено:", count);

    updateMetroAnalytics(

        line.name_ru || line.name,

        count

    );
    

}
/* =====================================================
   ANALYTICS
===================================================== */

function updateMetroAnalytics(

    line = "Все линии",

    count = metroStations.length

) {

    const selected = document.getElementById(

        "selectedMetroLine"

    );

    if (selected)

        selected.innerHTML = line;

    const stations = document.getElementById(

        "metroStationCount"

    );

    if (stations)

        stations.innerHTML = count;

}