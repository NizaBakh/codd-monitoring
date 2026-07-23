document.addEventListener("DOMContentLoaded", async () => {

    try {

        await loadDistricts();

        initDistricts();

        switch (PAGE) {

            case "/":
            case "/dashboard":

                await loadTrafficLights();

                await loadBusStops();

                await loadIntersections();

                await loadRoads();

                await loadPedestrianCrossings();

                await loadMetroCount();

                await loadParkingCount();

                await loadBridgeTunnelCount();

                await loadBicycleLaneCount();

                updateDashboardAnalytics();

                break;

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

        console.error(e);

    }

});


/* =======================================================
   GLOBAL
======================================================= */

window.bridgeTunnels = [];
window.bicycleLanes = [];


/* =======================================================
   METRO
======================================================= */

async function loadMetroCount() {

    try {

        const response = await fetch("/api/metro/stations");

        if (!response.ok) return;

        const stations = await response.json();

        const metro = document.getElementById("metroCount");

        if (metro)
            metro.innerHTML = stations.length;

    }

    catch (e) {

        console.error(e);

    }

}
/* =======================================================
   PARKINGS
======================================================= */

async function loadParkingCount() {

    try {

        const response = await fetch("/api/parkings/");

        if (!response.ok)
            return;

        parkings = await response.json();

        const counter = document.getElementById("parkingDashboardCount");

        if (counter)
            counter.innerHTML = parkings.length;

    }

    catch (e) {

        console.error(e);

    }

}


/* =======================================================
   BRIDGE / TUNNEL
======================================================= */

async function loadBridgeTunnelCount() {

    try {

        const response = await fetch("/api/bridge-tunnels/");

        if (!response.ok) return;

        bridgeTunnels = await response.json();

        const counter = document.getElementById("bridgeTunnelCount");

        if (counter)
            counter.innerHTML = bridgeTunnels.length;

    }

    catch (e) {

        console.error(e);

    }

}


/* =======================================================
   BICYCLE LANES
======================================================= */

async function loadBicycleLaneCount() {

    try {

        const response = await fetch("/api/bicycle-lanes/");

        if (!response.ok) return;

        bicycleLanes = await response.json();

        const counter = document.getElementById("bicycleLaneCount");

        if (counter)
            counter.innerHTML = bicycleLanes.length;

    }

    catch (e) {

        console.error(e);

    }

}


/* =======================================================
   DASHBOARD ANALYTICS
======================================================= */

function updateDashboardAnalytics() {

    const traffic = document.getElementById("trafficLightsCount");

    if (traffic)
        traffic.innerHTML = trafficLights.length;


    const bus = document.getElementById("busStopsCount");

    if (bus)
        bus.innerHTML = busStops.length;


    const roadsCounter = document.getElementById("roadsCount");

    if (roadsCounter)
        roadsCounter.innerHTML = roads.length;


    const crossings = document.getElementById("crossingsCount");

    if (crossings)
        crossings.innerHTML = pedestrianCrossings.length;


    const intersectionsCounter = document.getElementById("intersectionsCount");

    if (intersectionsCounter)
        intersectionsCounter.innerHTML = intersections.length;


    const bridgeCounter = document.getElementById("bridgeTunnelCount");

    if (bridgeCounter)
        bridgeCounter.innerHTML = bridgeTunnels.length;


    const bicycleCounter = document.getElementById("bicycleLaneDashboardCount");

    if (bicycleCounter)
        bicycleCounter.innerHTML = bicycleLanes.length;

    const parkingCounter = document.getElementById("parkingDashboardCount");

    if (parkingCounter)
        parkingCounter.innerHTML = parkings.length;
}