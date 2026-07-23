/* =====================================================
   BRIDGES & TUNNELS
===================================================== */

let bridgeTunnels = [];

/* =====================================================
   INIT
===================================================== */

async function initBridgeTunnels() {

    await loadBridgeTunnels();

    showOnlyLayer(window.bridgeTunnelLayer);

    updateBridgeTunnelAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadBridgeTunnels() {

    try {

        const response = await fetch("/api/bridge-tunnels/");

        if (!response.ok)
            throw new Error("Bridge Tunnel API");

        bridgeTunnels = await response.json();
        console.log("Всего сооружений:", bridgeTunnels.length);

        const types = [...new Set(bridgeTunnels.map(x => x.structure_type))];

        console.table(types);

        window.bridgeTunnelLayer.clearLayers();

        const counter = document.getElementById("bridgeTunnelCount");

        if (counter)
            counter.innerHTML = bridgeTunnels.length;

        bridgeTunnels.forEach(item => {

            const marker = L.marker(
                [
                    item.latitude,
                    item.longitude
                ],
                {
                    icon: window.bridgeTunnelIcon
                }
            );

            marker.bindPopup(`
                <b>${item.structure_type}</b><br>
                <b>Адрес:</b> ${item.address}<br>
                <b>Район:</b> ${item.district}<br>
                <b>Длина:</b> ${item.length} м
            `);

            window.bridgeTunnelLayer.addLayer(marker);

        });

    }

    catch (error) {

        console.error("Bridge Tunnel:", error);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterBridgeTunnels(district) {

    window.bridgeTunnelLayer.clearLayers();

    let count = 0;

    bridgeTunnels.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        count++;

        const marker = L.marker(
            [
                item.latitude,
                item.longitude
            ],
            {
                icon: window.bridgeTunnelIcon
            }
        );

        marker.bindPopup(`
            <b>${item.structure_type}</b><br>
            <b>Адрес:</b> ${item.address}<br>
            <b>Район:</b> ${item.district}<br>
            <b>Длина:</b> ${item.length} м
        `);

        window.bridgeTunnelLayer.addLayer(marker);

    });

    const counter = document.getElementById("bridgeTunnelCount");

    if (counter)
        counter.innerHTML = count;

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateBridgeTunnelAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = bridgeTunnels;

    }

    else {

        selected = bridgeTunnels.filter(item =>
            districtMatch(item.district, district)
        );

    }

    const districtName = document.getElementById("selectedDistrict");

    if (districtName) {

        districtName.innerHTML =
            (!district || (!district.name && !district.name_ru))
                ? "Весь город"
                : (district.name_ru || district.name);

    }

    const counter = document.getElementById("bridgeTunnelCount");

    if (counter)
        counter.innerHTML = selected.length;

    const avg = document.getElementById("bridgeTunnelLength");

    if (avg) {

        if (selected.length === 0) {

            avg.innerHTML = "—";

        }

        else {

            const total = selected.reduce((sum, x) => sum + (x.length || 0), 0);

            avg.innerHTML = (total / selected.length).toFixed(1) + " м";

        }

    }

   const type = document.getElementById("bridgeTunnelType");

if (type) {

    const stats = {};

    selected.forEach(item => {

        const t = (item.structure_type || "Не указан").trim();

        stats[t] = (stats[t] || 0) + 1;

    });

    let html = "";

    Object.entries(stats).forEach(([name, count]) => {

        let icon = "🏗";

        if (name.toLowerCase().includes("кўпри"))
            icon = "🌉";

        else if (name.toLowerCase().includes("тунн"))
            icon = "🚇";

        else if (name.toLowerCase().includes("ўтказгич"))
            icon = "🛣";

        html += `${icon} ${name}: <b>${count}</b><br>`;

    });

        const type = document.getElementById("bridgeTunnelType");

if (type) {

    const stats = {};

    selected.forEach(item => {

        const name = (item.structure_type || "Неизвестно").trim();

        stats[name] = (stats[name] || 0) + 1;

    });

    const icons = {
        "Темир йўл кўприги": "🌉",
        "Автомобиль кўприги": "🌉",
        "Пиёдалар кўприги": "🌉",
        "Автомобиль йўл ўтказгичлари": "🛣️",
        "Туннел": "🚇"
    };

    type.innerHTML = Object.entries(stats)
        .map(([name, count]) => `
            <div class="bridge-type-row">
                <span>${icons[name] || "📍"}</span>
                <span>${name}</span>
                <b>${count}</b>
            </div>
        `)
        .join("");

}
        type.classList.add("analytics-list");

}
}