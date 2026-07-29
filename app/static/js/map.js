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
let parkings = [];
let cameras = [];
let telekomsoft = [];
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
const cameraLayer = L.markerClusterGroup();
const telekomsoftLayer = L.markerClusterGroup({

    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 17,
    maxClusterRadius: 45

});

const roadsLayer = L.layerGroup();

const pedestrianLayer = L.layerGroup();
window.bridgeTunnelLayer = L.layerGroup();
window.bicycleLaneLayer = L.layerGroup();
window.parkingLayer = L.layerGroup();

/* =====================================================
   DEFAULT LAYERS
===================================================== */

map.addLayer(trafficLightsLayer);
map.addLayer(busStopsLayer);
map.addLayer(intersectionsLayer);
map.addLayer(roadsLayer);
map.addLayer(pedestrianLayer);
map.addLayer(window.bridgeTunnelLayer);
map.addLayer(window.bicycleLaneLayer);
map.addLayer(window.parkingLayer);
map.addLayer(cameraLayer);
map.addLayer(telekomsoftLayer);


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
const cameraIcon = L.icon({

    iconUrl: "/static/images/markers/camera.png",

    iconSize: [30, 30],

    iconAnchor: [15, 30],

    popupAnchor: [0, -30]

});
window.bridgeTunnelIcon = L.icon({

    iconUrl: "/static/images/markers/bridge.png",

    iconSize: [30,30],

    iconAnchor: [15,30]

});
window.bicycleLaneStyle = {

    color: "#00c853",

    weight: 4,

    opacity: 0.9

};

window.bicycleLaneSelectedStyle = {

    color: "#00ff66",

    weight: 6,

    opacity: 1

};