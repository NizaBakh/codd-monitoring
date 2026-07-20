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
   METRO COUNT
======================================================= */

async function loadMetroCount() {

    try {

        const response = await fetch("/api/metro/stations");

        if (!response.ok)
            return;

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
   DASHBOARD ANALYTICS
======================================================= */

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

}