/* =====================================================
   DISTRICTS
===================================================== */

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

    districts.forEach(district => {

        const geometry = safeJSON(district.geometry);

        if (!geometry)
            return;

        const layer = L.geoJSON(

            geometry,

            {

                style: {

                    color: "#4CAF50",

                    weight: 2,

                    fillOpacity: 0.05

                }

            }

        );

        layer.on({

            mouseover: function (e) {

                e.target.setStyle({

                    weight: 4,

                    fillOpacity: 0.15

                });

            },

            mouseout: function (e) {

                e.target.setStyle({

                    weight: 2,

                    fillOpacity: 0.05

                });

            },

            click: function () {

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

       default:

    filterDashboard(district);

    break;

    }

}