/* =====================================================
   DISTRICTS
===================================================== */
window.PAGE = window.location.pathname;
async function loadDistricts() {

    try {

        const response = await fetch("/api/districts/");

        if (!response.ok) {

            throw new Error("District API");

        }

        districts = await response.json();

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   DRAW DISTRICTS
===================================================== */

function initDistricts() {

    // Если это Dashboard — карту не рисуем
    if (PAGE === "/" || PAGE === "/dashboard") {
        return;
    }

    districts.forEach(district => {

        const geometry = safeJSON(district.geometry);

        if (!geometry)
            return;

        const layer = L.geoJSON(geometry, {

            style: {
                color: "#4CAF50",
                weight: 2,
                fillOpacity: 0.05
            }

        });

        layer.on({

            mouseover(e) {

                e.target.setStyle({
                    weight: 4,
                    fillOpacity: 0.15
                });

            },

            mouseout(e) {

                e.target.setStyle({
                    weight: 2,
                    fillOpacity: 0.05
                });

            },

            click() {

                districtClicked(district);

            }

        });

        layer.addTo(map);

    });

}

/* =====================================================
   DEFAULT ANALYTICS
===================================================== */

function showDefaultAnalytics() {

    switch (PAGE) {

        case "/traffic-lights":

            updateTrafficAnalytics({
                name: "",
                name_ru: ""
            });

            break;

        case "/bus-stops":

            updateBusAnalytics({
                name: "",
                name_ru: ""
            });

            break;

        case "/roads":

            updateRoadAnalytics({
                name: "",
                name_ru: ""
            });

            break;

        case "/intersections":

            updateIntersectionAnalytics({
                name: "",
                name_ru: ""
            });

            break;

        case "/pedestrian-crossings":

            updatePedestrianAnalytics({
                name: "",
                name_ru: ""
            });

            break;

        case "/cameras":

            updateCameraAnalytics({
                name: "",
                name_ru: ""
            });

            break;
       

    break;  

    }

}

/* =====================================================
   DISTRICT CLICK
===================================================== */

function districtClicked(district) {

    switch (PAGE) {

        case "/traffic-lights":

            filterTrafficLights(district);

            updateTrafficAnalytics(district);

            break;

        case "/bus-stops":

            filterBusStops(district);

            updateBusAnalytics(district);

            break;

        case "/roads":

            filterRoads(district);

            updateRoadAnalytics(district);

            break;

        case "/intersections":

            filterIntersections(district);

            updateIntersectionAnalytics(district);

            break;

        case "/pedestrian-crossings":

            filterPedestrianCrossings(district);

            updatePedestrianAnalytics(district);

            break;
        case "/bridge-tunnels":

            filterBridgeTunnels(district);
            updateBridgeTunnelAnalytics(district);

            break;

        case "/bicycle-lanes":

            filterBicycleLanes(district);
            updateBicycleLaneAnalytics(district);
            break;
            
        case "/parkings":

            filterParkings(district);
            updateParkingAnalytics(district);

            break;
        case "/cameras":

            filterCameras(district);

            updateCameraAnalytics(district);

            break;
       

       default:

    filterDashboard(district);

    break;

    }

}
/* =====================================================
   DASHBOARD DISTRICT CARDS
===================================================== */

function renderDistrictCards() {

    const container = document.getElementById("districtCards");

    if (!container)
        return;

    container.innerHTML = "";

    districts.forEach(district => {

        const trafficCount =
            trafficLights.filter(t =>
                t.district === district.name ||
                t.district === district.name_ru
            ).length;

        const busCount =
            busStops.filter(t =>
                t.district === district.name ||
                t.district === district.name_ru
            ).length;

        const roadCount =
            roads.filter(t =>
                t.district === district.name ||
                t.district === district.name_ru
            ).length;

        const cameraCount =
            cameras.filter(t =>
                t.district === district.name ||
                t.district === district.name_ru
            ).length;

        container.innerHTML += `

        <div class="district-card">

            <h3>${district.name_ru}</h3>

            <div class="district-stat">
                <span>🚦 Светофоры</span>
                <b>${trafficCount}</b>
            </div>

            <div class="district-stat">
                <span>🚌 Остановки</span>
                <b>${busCount}</b>
            </div>

            <div class="district-stat">
                <span>🛣 Дороги</span>
                <b>${roadCount}</b>
            </div>

            <div class="district-stat">
                <span>📷 Камеры</span>
                <b>${cameraCount}</b>
            </div>

        </div>

        `;

    });

}