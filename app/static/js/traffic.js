/* =====================================================
   TRAFFIC LIGHTS
===================================================== */

async function initTrafficLights() {

    await loadTrafficLights();

    showOnlyLayer(trafficLightsLayer);

    console.log("traffic:", trafficLights.length);

    updateTrafficAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadTrafficLights() {

    try {

        const response = await fetch("/api/traffic-lights/");

        if (!response.ok) {

            throw new Error("Traffic API");

        }

        trafficLights = await response.json();

        trafficLightsLayer.clearLayers();

        const counter = document.getElementById("trafficCount");

        if (counter) {

            counter.innerHTML = trafficLights.length;

        }

        trafficLights.forEach(light => {

            const marker = L.marker(

                [

                    light.latitude,

                    light.longitude

                ],

                {

                    icon: trafficLightIcon

                }

            );

            marker.bindPopup(

                popup(

                    `🚦 ${light.name}`,

                    `
                    <b>ID:</b> ${light.id}<br>
                    <b>Статус:</b> ${light.status}<br>
                    <b>Район:</b> ${light.district}
                    `

                )

            );

            trafficLightsLayer.addLayer(marker);

        });

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterTrafficLights(district) {

    trafficLightsLayer.clearLayers();

    let count = 0;

    trafficLights.forEach(light => {

        if (!districtMatch(light.district, district))
            return;

        count++;

        const marker = L.marker(

            [

                light.latitude,

                light.longitude

            ],

            {

                icon: trafficLightIcon

            }

        );

        marker.bindPopup(

            popup(

                `🚦 ${light.name}`,

                `
                <b>ID:</b> ${light.id}<br>
                <b>Статус:</b> ${light.status}<br>
                <b>Район:</b> ${light.district}
                `

            )

        );

        trafficLightsLayer.addLayer(marker);

    });

    const counter = document.getElementById("trafficCount");

    if (counter) {

        counter.innerHTML = count;

    }

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateTrafficAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = trafficLights;

    } else {

        selected = trafficLights.filter(light =>
            districtMatch(light.district, district)
        );

    }

    const districtName = document.getElementById("selectedDistrict");

    if (districtName) {

        districtName.innerHTML =
            (!district || (!district.name && !district.name_ru))
                ? "Весь город"
                : (district.name_ru || district.name);

    }

    const trafficCount = document.getElementById("districtTrafficCount");

    if (trafficCount) {

        trafficCount.innerHTML = selected.length;

    }

    let active = 0;
    let offline = 0;
    let maintenance = 0;

    selected.forEach(light => {

        switch ((light.status || "").toUpperCase()) {

            case "ACTIVE":
                active++;
                break;

            case "OFFLINE":
                offline++;
                break;

            case "MAINTENANCE":
                maintenance++;
                break;

        }

    });

    const status = document.getElementById("trafficStatus");

    if (status) {

        status.innerHTML = `
            🟢 ACTIVE: ${active}<br>
            🟡 MAINTENANCE: ${maintenance}<br>
            🔴 OFFLINE: ${offline}
        `;

    }

    const types = document.getElementById("trafficTypes");

    if (types) {

        types.innerHTML = "Нет данных";

    }

}