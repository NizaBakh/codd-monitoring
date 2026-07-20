/* =====================================================
   MAP
===================================================== */

const PAGE = window.location.pathname;

/* =====================================================
   DATA
===================================================== */

let trafficLights = [];
let busStops = [];
let intersections = [];
let roads = [];
let pedestrianCrossings = [];
let districts = [];

/* =====================================================
   MAP
===================================================== */

const map = L.map("map", {

    zoomControl: true,
    preferCanvas: true

}).setView([41.311081, 69.240562], 12);

L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        attribution: "&copy; OpenStreetMap contributors"

    }

).addTo(map);

/* =====================================================
   LAYERS
===================================================== */

const trafficLightsLayer = L.markerClusterGroup({

    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 17,
    maxClusterRadius: 45

});

const busStopsLayer = L.markerClusterGroup({

    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 17,
    maxClusterRadius: 45

});

const intersectionsLayer = L.markerClusterGroup({

    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 17,
    maxClusterRadius: 45

});

const roadsLayer = L.layerGroup();

const pedestrianLayer = L.layerGroup();

/* =====================================================
   DEFAULT LAYERS
===================================================== */

map.addLayer(trafficLightsLayer);
map.addLayer(busStopsLayer);
map.addLayer(intersectionsLayer);
map.addLayer(roadsLayer);
map.addLayer(pedestrianLayer);

/* =====================================================
   ICONS
===================================================== */

const trafficLightIcon = L.icon({

    iconUrl: "/static/images/markers/traffic-light.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});

const busStopIcon = L.icon({

    iconUrl: "/static/images/markers/bus_stop.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});