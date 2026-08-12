
let busRoutesLayer = null;

const ROUTE_COLORS = [
    "#ff3b30",
    "#007aff",
    "#34c759",
    "#ff9500",
    "#af52de",
    "#00c7be",
    "#ff2d55",
    "#5856d6",
    "#30b0c7",
    "#ffd60a",
    "#8e8e93",
    "#64d2ff"
];

function routeColor(routeNumber){

    if(!routeNumber)
        return "#007aff";

    let hash = 0;

    for(let i = 0; i < routeNumber.length; i++){

        hash += routeNumber.charCodeAt(i);

    }

    return ROUTE_COLORS[Math.abs(hash) % ROUTE_COLORS.length];

}
async function loadBusRoutes() {

    try {

        const response = await fetch("/api/bus-routes/");

        if (!response.ok) {
            throw new Error("Ошибка загрузки маршрутов");
        }

        busRoutes = await response.json();

        console.log("Routes:", busRoutes);
        console.log("Количество:", busRoutes.length);
        console.log("Первый маршрут:", busRoutes[0]);

        const testGeometry = JSON.parse(busRoutes[0].geometry);

        console.log(testGeometry);
        console.log(testGeometry.type);
        console.log(testGeometry.coordinates[0]);

        // Подготавливаем GeoJSON
        const features = busRoutes.map(route => {

            let geometry = route.geometry;

            if (typeof geometry === "string") {
                geometry = JSON.parse(geometry);
            }

            return {
                type: "Feature",
                geometry: geometry,
                properties: route
            };

        });

        console.log("FEATURES:", features);
        console.log("FIRST FEATURE:", features[0]);

        window.busRoutesLayer.clearLayers();

        busRoutesLayer = L.geoJSON(features, {

            style: feature => ({
                color: routeColor(feature.properties.route_number),
                weight: 4,
                opacity: 0.9
            }),

            onEachFeature: (feature, layer) => {

                feature.properties._layer = layer;

                layer.bindPopup(`
                    <b>🚌 Маршрут № ${feature.properties.route_number}</b><br>
                    ${feature.properties.name}
                `);

                layer.on("mouseover", function () {

                    this.setStyle({
                        weight: 7,
                        opacity: 1
                    });

                    this.bringToFront();

                });

                layer.on("mouseout", function () {

                    busRoutesLayer.resetStyle(this);

                });

            }

        });

        window.busRoutesLayer.addLayer(busRoutesLayer);

        console.log("Bus routes loaded:", busRoutes.length);
        console.log("GeoJSON layers:", busRoutesLayer.getLayers().length);
        console.log("LayerGroup layers:", window.busRoutesLayer.getLayers().length);

        renderRouteList(busRoutes);

    }

    catch (err) {

        console.error(err);

    }

}


function renderRouteList(routes){

    const list = document.getElementById("route-list");
    const counter = document.getElementById("routeCount");

    if(!list)
        return;

    list.innerHTML = "";

    // Оставляем только уникальные номера маршрутов
    const uniqueRoutes = [];
    const seen = new Set();

    routes.forEach(route => {

        if(seen.has(route.route_number))
            return;

        seen.add(route.route_number);
        uniqueRoutes.push(route);

    });

    if(counter){

        counter.textContent = uniqueRoutes.length;

    }

    uniqueRoutes.forEach(route=>{

        const item = document.createElement("div");

        item.className = "route-item";

        item.innerHTML = `

            <div class="route-color"
                 style="background:${routeColor(route.route_number)}">
            </div>

            <div class="route-info">

                <div class="route-number">
                    ${route.route_number}
                </div>

                <div class="route-name">
                    ${route.name}
                </div>

            </div>

        `;

        item.onclick = () => focusRoute(route);

        list.appendChild(item);

    });

}

function focusRoute(route){

    window.busRoutesLayer.clearLayers();

    const selected = L.geoJSON(
        [{
            type: "Feature",
            geometry: JSON.parse(route.geometry),
            properties: route
        }],
        {
            style: {
                color: routeColor(route.route_number),
                weight: 7,
                opacity: 1
            },
            onEachFeature: (feature, layer) => {

                layer.bindPopup(`
                    <b>🚌 Маршрут № ${route.route_number}</b><br>
                    ${route.name}
                `);

                layer.openPopup();

            }
        }
    );

    window.busRoutesLayer.addLayer(selected);

    map.fitBounds(selected.getBounds(), {
        padding: [40,40]
    });

}

function searchRoutes(){

    const text = document
        .getElementById("routeSearch")
        .value
        .trim()
        .toLowerCase();

    if(text === ""){

        renderRouteList(busRoutes);
        showAllRoutes();
        return;

    }

    const filtered = busRoutes.filter(r =>
        r.route_number.toLowerCase().includes(text) ||
        r.name.toLowerCase().includes(text)
    );

    renderRouteList(filtered);

}

document.addEventListener("DOMContentLoaded",()=>{

    loadBusRoutes();

    const input = document.getElementById("routeSearch");

    if(input){

        input.addEventListener("input",searchRoutes);

    }

});