/* =====================================================
   SMART CITY MAP
   Leaflet + dark basemap + 3D visual effects
===================================================== */

window.PAGE = window.location.pathname;


/* =====================================================
   DATA
===================================================== */

window.trafficLights = [];
window.busStops = [];
window.intersections = [];
window.roads = [];
window.pedestrianCrossings = [];
window.districts = [];

window.parkings = [];
window.cameras = [];

window.railwayStations = [];
window.railwayLines = [];

window.busRoutes = [];


/* =====================================================
   MAP
===================================================== */

window.map = null;

const mapElement = document.getElementById("map");

if (mapElement) {

    window.map = L.map("map", {

        zoomControl: true,

        preferCanvas: true,

        zoomAnimation: true,

        fadeAnimation: true,

        markerZoomAnimation: true

    }).setView(

        [41.311081, 69.240562],

        12

    );


    /* =================================================
       DARK BASE MAP
    ================================================= */

 /* =====================================================
   BASE MAPS
===================================================== */

window.darkMapLayer = L.tileLayer(

    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",

    {

        attribution:
            "&copy; OpenStreetMap &copy; CARTO",

        subdomains: "abcd",

        maxZoom: 20,

        detectRetina: true

    }

);


window.lightMapLayer = L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution:
            "&copy; OpenStreetMap contributors",

        maxZoom: 19,

        detectRetina: true

    }

);


/* =====================================================
   INITIAL MAP THEME
===================================================== */

const savedTheme =
    localStorage.getItem("theme") || "dark";


if (savedTheme === "light") {

    window.lightMapLayer.addTo(window.map);

} else {

    window.darkMapLayer.addTo(window.map);

}

window.setMapTheme = function(theme) {

    if (!window.map)
        return;


    if (theme === "light") {

        if (window.map.hasLayer(
            window.darkMapLayer
        )) {

            window.map.removeLayer(
                window.darkMapLayer
            );

        }

        window.lightMapLayer.addTo(
            window.map
        );

    }

    else {

        if (window.map.hasLayer(
            window.lightMapLayer
        )) {

            window.map.removeLayer(
                window.lightMapLayer
            );

        }

        window.darkMapLayer.addTo(
            window.map
        );

    }

};
    /* =================================================
       ATMOSPHERE OVERLAY
    ================================================= */

    const atmosphere = L.rectangle(

        [
            [41.05, 69.05],
            [41.55, 69.55]
        ],

        {

            stroke: false,

            fillColor: "#0b1220",

            fillOpacity: 0.10,

            interactive: false

        }

    );

    atmosphere.addTo(window.map);

}


/* =====================================================
   LAYERS
===================================================== */

window.trafficLightsLayer =
    L.markerClusterGroup({

        showCoverageOnHover: false,

        spiderfyOnMaxZoom: true,

        removeOutsideVisibleBounds: true,

        disableClusteringAtZoom: 17,

        maxClusterRadius: 45

    });


window.busStopsLayer =
    L.markerClusterGroup({

        showCoverageOnHover: false,

        spiderfyOnMaxZoom: true,

        removeOutsideVisibleBounds: true,

        disableClusteringAtZoom: 17,

        maxClusterRadius: 45

    });


window.intersectionsLayer =
    L.markerClusterGroup({

        showCoverageOnHover: false,

        spiderfyOnMaxZoom: true,

        removeOutsideVisibleBounds: true,

        disableClusteringAtZoom: 17,

        maxClusterRadius: 45

    });


window.cameraLayer =
    L.markerClusterGroup({

        showCoverageOnHover: false,

        spiderfyOnMaxZoom: true,

        removeOutsideVisibleBounds: true,

        disableClusteringAtZoom: 17,

        maxClusterRadius: 45

    });


window.roadsLayer =
    L.layerGroup();


window.pedestrianLayer =
    L.layerGroup();


window.bridgeTunnelLayer =
    L.layerGroup();


window.bicycleLaneLayer =
    L.layerGroup();


window.parkingLayer =
    L.layerGroup();


window.busRoutesLayer =
    L.layerGroup();


/* =====================================================
   ADD DEFAULT LAYERS
===================================================== */

if (window.map) {

    window.map.addLayer(
        window.trafficLightsLayer
    );

    window.map.addLayer(
        window.busStopsLayer
    );

    window.map.addLayer(
        window.intersectionsLayer
    );

    window.map.addLayer(
        window.roadsLayer
    );

    window.map.addLayer(
        window.pedestrianLayer
    );

    window.map.addLayer(
        window.bridgeTunnelLayer
    );

    window.map.addLayer(
        window.bicycleLaneLayer
    );

    window.map.addLayer(
        window.parkingLayer
    );

    window.map.addLayer(
        window.cameraLayer
    );

    window.map.addLayer(
        window.busRoutesLayer
    );

}


/* =====================================================
   ICONS
===================================================== */

window.trafficLightIcon = L.icon({

    iconUrl:
        "/static/images/markers/traffic-light.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});


window.busStopIcon = L.icon({

    iconUrl:
        "/static/images/markers/bus_stop.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});


window.cameraIcon = L.icon({

    iconUrl:
        "/static/images/markers/camera.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});


window.bridgeTunnelIcon = L.icon({

    iconUrl:
        "/static/images/markers/bridge.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30]

});


/* =====================================================
   BICYCLE LANES
===================================================== */

window.bicycleLaneStyle = {

    color: "#00e676",

    weight: 4,

    opacity: 0.95

};


window.bicycleLaneSelectedStyle = {

    color: "#69ff9b",

    weight: 7,

    opacity: 1

};


/* =====================================================
   3D BUILDING EFFECT
===================================================== */

/*
    Это визуальный эффект.
    Реальные здания пока не загружаем.
    Позже сюда можно подключить GeoJSON
    зданий с height.
*/

window.create3DBuilding = function (
    geometry,
    options = {}
) {

    if (!window.map || !geometry)
        return null;


    const height =
        options.height || 20;


    const baseColor =
        options.color || "#334155";


    const layer =
        L.geoJSON(

            geometry,

            {

                style: {

                    color: "#64748b",

                    weight: 1,

                    opacity: 0.9,

                    fillColor: baseColor,

                    fillOpacity: 0.65

                }

            }

        );


    /*
        Имитация боковой тени.
        При наведении здание визуально
        становится ярче.
    */

    layer.on({

        mouseover(e) {

            e.target.setStyle({

                color: "#94a3b8",

                weight: 2,

                fillColor: "#475569",

                fillOpacity: 0.85

            });

        },


        mouseout(e) {

            e.target.setStyle({

                color: "#64748b",

                weight: 1,

                fillColor: baseColor,

                fillOpacity: 0.65

            });

        }

    });


    return layer;

};


/* =====================================================
   CITY CENTER EFFECT
===================================================== */

if (window.map) {

    const centerGlow =
        L.circle(

            [41.311081, 69.240562],

            {

                radius: 5000,

                stroke: false,

                fillColor: "#3b82f6",

                fillOpacity: 0.025,

                interactive: false

            }

        );

    centerGlow.addTo(window.map);

}


/* =====================================================
   MAP CONTROLS
===================================================== */

if (window.map) {

    L.control.zoom({

        position: "bottomright"

    }).addTo(window.map);


    /*
        Масштаб
    */

    L.control.scale({

        position: "bottomleft",

        imperial: false

    }).addTo(window.map);

}