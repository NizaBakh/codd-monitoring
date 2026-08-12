/* =========================================================
   DASHBOARD
========================================================= */


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await loadDistricts();

        if (document.getElementById("map")) {
            initDistricts();
        }

        switch (PAGE) {

            /* =================================================
               DASHBOARD
            ================================================= */

            case "/":
            case "/dashboard":

                await loadAllTrafficLights();

                await loadBusStops();

                await loadIntersections();

                await loadRoads();

                await loadPedestrianCrossings();

                await loadMetroCount();

                await loadParkingCount();

                await loadBridgeTunnelCount();

                await loadBicycleLaneCount();

                await loadCameras();

                await loadRailwayStationsCount();

                await loadRailwayLinesCount();

                await loadBusRoutesCount();

                updateDashboardAnalytics();

                renderDistrictCards();

                break;


            /* =================================================
               OTHER PAGES
            ================================================= */

            case "/traffic-lights":

                await initTrafficLights();

                break;


            case "/bus-stops":

                await initBusStops();

                break;


            case "/roads":

                await initRoads();

                break;


            case "/intersections":

                await initIntersections();

                break;


            case "/pedestrian-crossings":

                await initPedestrianCrossings();

                break;


            case "/bridge-tunnels":

                await initBridgeTunnels();

                break;


            case "/bicycle-lanes":

                await initBicycleLanes();

                break;


            case "/parkings":

                await initParkings();

                break;


            case "/metro":

                await initMetro();

                break;

        }

    }

    catch (e) {

        console.error("Dashboard:", e);

    }

});


/* =========================================================
   GLOBAL ARRAYS
========================================================= */

window.bridgeTunnels =
    window.bridgeTunnels || [];

window.bicycleLanes =
    window.bicycleLanes || [];

window.railwayStations =
    window.railwayStations || [];

window.railwayLines =
    window.railwayLines || [];

window.busRoutes =
    window.busRoutes || [];


/* =========================================================
   METRO COUNT
========================================================= */

async function loadMetroCount() {

    try {

        const response =
            await fetch("/api/metro/stations");

        if (!response.ok)
            return;

        const stations =
            await response.json();

        const metro =
            document.getElementById("metroCount");

        if (metro) {

            metro.textContent =
                stations.length;

        }

    }

    catch (e) {

        console.error("Metro:", e);

    }

}


/* =========================================================
   RAILWAY STATIONS COUNT
========================================================= */

async function loadRailwayStationsCount() {

    try {

        const response =
            await fetch("/api/railway-stations/");

        if (!response.ok)
            return;

        window.railwayStations =
            await response.json();

        const counter =
            document.getElementById(
                "railwayStationsCount"
            );

        if (counter) {

            counter.textContent =
                window.railwayStations.length;

        }

    }

    catch (e) {

        console.error("Railway stations:", e);

    }

}


/* =========================================================
   RAILWAY LINES COUNT
========================================================= */

async function loadRailwayLinesCount() {

    try {

        const response =
            await fetch("/api/railway-lines/");

        if (!response.ok)
            return;

        window.railwayLines =
            await response.json();

        const counter =
            document.getElementById(
                "railwayLinesCount"
            );

        if (counter) {

            counter.textContent =
                window.railwayLines.length;

        }

    }

    catch (e) {

        console.error("Railway lines:", e);

    }

}


/* =========================================================
   BUS ROUTES COUNT
========================================================= */

async function loadBusRoutesCount() {

    try {

        const response =
            await fetch("/api/bus-routes/");

        if (!response.ok)
            return;

        window.busRoutes =
            await response.json();

        const counter =
            document.getElementById(
                "busRoutesCount"
            );

        if (counter) {

            counter.textContent =
                window.busRoutes.length;

        }

    }

    catch (e) {

        console.error("Bus routes:", e);

    }

}


/* =========================================================
   PARKING COUNT
========================================================= */

async function loadParkingCount() {

    try {

        const response =
            await fetch("/api/parkings/");

        if (!response.ok)
            return;

        window.parkings =
            await response.json();

        const counter =
            document.getElementById(
                "parkingDashboardCount"
            );

        if (counter) {

            counter.textContent =
                window.parkings.length;

        }

    }

    catch (e) {

        console.error("Parking:", e);

    }

}


/* =========================================================
   BRIDGE / TUNNEL COUNT
========================================================= */

async function loadBridgeTunnelCount() {

    try {

        const response =
            await fetch("/api/bridge-tunnels/");

        if (!response.ok)
            return;

        window.bridgeTunnels =
            await response.json();

        const counter =
            document.getElementById(
                "bridgeTunnelCount"
            );

        if (counter) {

            counter.textContent =
                window.bridgeTunnels.length;

        }

    }

    catch (e) {

        console.error("Bridge / tunnel:", e);

    }

}


/* =========================================================
   BICYCLE LANES COUNT
========================================================= */

async function loadBicycleLaneCount() {

    try {

        const response =
            await fetch("/api/bicycle-lanes/");

        if (!response.ok)
            return;

        window.bicycleLanes =
            await response.json();

        const counter =
            document.getElementById(
                "bicycleLaneCount"
            );

        if (counter) {

            counter.textContent =
                window.bicycleLanes.length;

        }

    }

    catch (e) {

        console.error("Bicycle lanes:", e);

    }

}


/* =========================================================
   DASHBOARD KPI
========================================================= */

function updateDashboardAnalytics() {

    const set = (id, value) => {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                value;

        }

    };


    set(
        "trafficLightsCount",
        trafficLights.length
    );


    set(
        "busStopsCount",
        busStops.length
    );


    set(
        "roadsCount",
        roads.length
    );


    set(
        "crossingsCount",
        pedestrianCrossings.length
    );


    set(
        "intersectionsCount",
        intersections.length
    );


    set(
        "metroCount",
        document.getElementById(
            "metroCount"
        )?.textContent || 0
    );


    set(
        "bridgeTunnelCount",
        window.bridgeTunnels.length
    );


    set(
        "bicycleLaneCount",
        window.bicycleLanes.length
    );


    set(
        "parkingDashboardCount",
        window.parkings?.length || 0
    );


    set(
        "cameraDashboardCount",
        cameras.length
    );


    set(
        "railwayStationsCount",
        window.railwayStations.length
    );


    set(
        "railwayLinesCount",
        window.railwayLines.length
    );


    set(
        "busRoutesCount",
        window.busRoutes.length
    );

}


/* =========================================================
   DISTRICT DATA
========================================================= */

function getDistrictData(district) {

    const matchesDistrict = item => {

        return districtMatch(
            item.district,
            district
        );

    };


    return {

        trafficLights:
            trafficLights.filter(matchesDistrict).length,

        cameras:
            cameras.filter(matchesDistrict).length,

        busStops:
            busStops.filter(matchesDistrict).length,

        roads:
            roads.filter(matchesDistrict).length,

        pedestrianCrossings:
            pedestrianCrossings.filter(matchesDistrict).length,

        intersections:
            intersections.filter(matchesDistrict).length,

        bicycleLanes:
            window.bicycleLanes.filter(matchesDistrict).length,

        bridgeTunnels:
            window.bridgeTunnels.filter(matchesDistrict).length,

        parkings:
            (window.parkings || [])
                .filter(matchesDistrict)
                .length

    };

}


/* =========================================================
   DISTRICT CARDS
========================================================= */

function renderDistrictCards() {

    const container =
        document.getElementById(
            "districtCards"
        );

    if (!container)
        return;


    container.innerHTML = "";


    districts.forEach(district => {

        const data =
            getDistrictData(district);


        const total =
            data.trafficLights +
            data.cameras +
            data.busStops +
            data.roads +
            data.pedestrianCrossings +
            data.intersections +
            data.bicycleLanes +
            data.bridgeTunnels +
            data.parkings;


        const card =
            document.createElement("div");


        card.className =
            "district-card";


        card.innerHTML = `

            <div class="district-name">

                ${district.name_ru}

            </div>


            <div class="district-status">

                <span>Состояние:</span>

                <b class="status-ok">
                    Норма
                </b>

            </div>


            <div class="district-icons">

                <span>
                    🚦 ${data.trafficLights}
                </span>

                <span>
                    🚌 ${data.busStops}
                </span>

                <span>
                    🛣️ ${data.roads}
                </span>

                <span>
                    📷 ${data.cameras}
                </span>

            </div>


            <div style="
                margin-top:8px;
                color:#8fa3b8;
                font-size:11px;
            ">

                Всего объектов:
                <b style="color:#fff;">
                    ${total}
                </b>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openDistrictModal(
                    district
                );

            }
        );


        container.appendChild(card);

    });

}


/* =========================================================
   DISTRICT MODAL
========================================================= */

function openDistrictModal(district) {

    const data =
        getDistrictData(district);


    const oldModal =
        document.getElementById(
            "districtDetailsModal"
        );


    if (oldModal) {

        oldModal.remove();

    }


    const modal =
        document.createElement("div");


    modal.id =
        "districtDetailsModal";


    modal.style.cssText = `

        position:fixed;
        inset:0;

        background:rgba(0,0,0,.72);

        display:flex;
        align-items:center;
        justify-content:center;

        z-index:99999;

        padding:20px;

        backdrop-filter:blur(5px);

    `;


    modal.innerHTML = `

        <div style="

            width:min(720px, 100%);

            max-height:90vh;

            overflow-y:auto;

            background:#1d2632;

            color:white;

            border-radius:22px;

            border:1px solid rgba(255,255,255,.08);

            box-shadow:0 25px 80px rgba(0,0,0,.55);

            padding:24px;

        ">


            <div style="

                display:flex;

                justify-content:space-between;

                align-items:center;

                gap:15px;

                margin-bottom:20px;

            ">

                <div>

                    <div style="

                        font-size:24px;

                        font-weight:700;

                    ">

                        ${district.name_ru}

                    </div>


                    <div style="

                        color:#94a3b8;

                        font-size:13px;

                        margin-top:4px;

                    ">

                        Подробное состояние инфраструктуры

                    </div>

                </div>


                <button

                    id="closeDistrictModal"

                    style="

                        width:38px;

                        height:38px;

                        border:0;

                        border-radius:10px;

                        background:#2b3948;

                        color:white;

                        font-size:22px;

                        cursor:pointer;

                    "

                >

                    ×

                </button>

            </div>


            <div style="

                display:grid;

                grid-template-columns:
                    repeat(3, minmax(0,1fr));

                gap:10px;

            ">


                ${districtMetric(
                    "🚦",
                    "Светофоры",
                    data.trafficLights
                )}


                ${districtMetric(
                    "📷",
                    "Камеры",
                    data.cameras
                )}


                ${districtMetric(
                    "🚌",
                    "Остановки",
                    data.busStops
                )}


                ${districtMetric(
                    "🛣️",
                    "Дороги",
                    data.roads
                )}


                ${districtMetric(
                    "🚸",
                    "Пешеходные переходы",
                    data.pedestrianCrossings
                )}


                ${districtMetric(
                    "✳️",
                    "Перекрёстки",
                    data.intersections
                )}


                ${districtMetric(
                    "🚲",
                    "Велодорожки",
                    data.bicycleLanes
                )}


                ${districtMetric(
                    "🌉",
                    "Мосты / тоннели",
                    data.bridgeTunnels
                )}


                ${districtMetric(
                    "🅿️",
                    "Парковки",
                    data.parkings
                )}

            </div>


            <div style="

                margin-top:20px;

                padding-top:18px;

                border-top:
                    1px solid rgba(255,255,255,.08);

                display:flex;

                justify-content:flex-end;

                gap:10px;

            ">


                <button

                    id="downloadDistrictData"

                    style="

                        border:0;

                        border-radius:10px;

                        padding:11px 16px;

                        background:#2563eb;

                        color:white;

                        font-weight:600;

                        cursor:pointer;

                    "

                >

                    ⬇ Скачать данные

                </button>


                <button

                    id="closeDistrictModalBottom"

                    style="

                        border:0;

                        border-radius:10px;

                        padding:11px 16px;

                        background:#334155;

                        color:white;

                        font-weight:600;

                        cursor:pointer;

                    "

                >

                    Закрыть

                </button>


            </div>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById(
            "closeDistrictModal"
        )
        .addEventListener(
            "click",
            closeDistrictModal
        );


    document
        .getElementById(
            "closeDistrictModalBottom"
        )
        .addEventListener(
            "click",
            closeDistrictModal
        );


    document
        .getElementById(
            "downloadDistrictData"
        )
        .addEventListener(
            "click",
            () => {

                downloadDistrictCSV(
                    district,
                    data
                );

            }
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeDistrictModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        districtModalEscapeHandler
    );

}


/* =========================================================
   DISTRICT METRIC
========================================================= */

function districtMetric(
    icon,
    name,
    value
) {

    return `

        <div style="

            background:#243243;

            border-radius:13px;

            padding:14px;

            min-height:75px;

            display:flex;

            flex-direction:column;

            justify-content:center;

        ">

            <div style="

                font-size:22px;

                margin-bottom:6px;

            ">

                ${icon}

            </div>


            <div style="

                color:#aebdcb;

                font-size:11px;

            ">

                ${name}

            </div>


            <div style="

                color:white;

                font-size:21px;

                font-weight:700;

                margin-top:2px;

            ">

                ${value}

            </div>

        </div>

    `;

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeDistrictModal() {

    const modal =
        document.getElementById(
            "districtDetailsModal"
        );


    if (modal) {

        modal.remove();

    }


    document.removeEventListener(
        "keydown",
        districtModalEscapeHandler
    );

}


function districtModalEscapeHandler(event) {

    if (event.key === "Escape") {

        closeDistrictModal();

    }

}


/* =========================================================
   CSV DOWNLOAD
========================================================= */

function downloadDistrictCSV(
    district,
    data
) {

    const rows = [

        [
            "Район",
            district.name_ru
        ],

        [
            "Светофоры",
            data.trafficLights
        ],

        [
            "Камеры",
            data.cameras
        ],

        [
            "Остановки",
            data.busStops
        ],

        [
            "Дороги",
            data.roads
        ],

        [
            "Пешеходные переходы",
            data.pedestrianCrossings
        ],

        [
            "Перекрёстки",
            data.intersections
        ],

        [
            "Велодорожки",
            data.bicycleLanes
        ],

        [
            "Мосты / тоннели",
            data.bridgeTunnels
        ],

        [
            "Парковки",
            data.parkings
        ]

    ];


    const csv =
        "\uFEFF" +
        rows
            .map(row =>
                row
                    .map(value =>
                        `"${String(value)
                            .replace(/"/g, '""')}"`
                    )
                    .join(";")
            )
            .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    const safeName =
        district.name_ru
            .replace(/[\\/:*?"<>|]/g, "_")
            .replace(/\s+/g, "_");


    link.download =
        `district_${safeName}.csv`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}