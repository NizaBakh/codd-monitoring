/* =====================================================
   BUS STOPS
===================================================== */
async function initBusStops() {

    await loadBusStops();

    showOnlyLayer(busStopsLayer);

    console.log("bus:", busStops.length);

    updateBusAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadBusStops() {

    try {

        const response = await fetch("/api/bus-stops/");

        if (!response.ok)
            throw new Error("Bus Stop API");

        busStops = await response.json();

        busStopsLayer.clearLayers();

        const counter = document.getElementById("busCount");

        if (counter)
            counter.innerHTML = busStops.length;

        busStops.forEach(stop => {

            const marker = L.marker(

                [
                    stop.latitude,
                    stop.longitude
                ],

                {
                    icon: busStopIcon
                }

            );

            marker.bindPopup(

                popup(

                    `🚌 ${stop.name}`,

                    `
                    <b>Район:</b> ${stop.district}<br>
                    <b>Тип:</b> ${stop.construction_type || "-"}<br>
                    <b>Организация:</b> ${stop.organization_raw || "-"}
                    `

                )

            );

            busStopsLayer.addLayer(marker);

        });

    }

    catch(error){

        console.error(error);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterBusStops(district){

    busStopsLayer.clearLayers();

    let selected = [];

    busStops.forEach(stop=>{

        if(!districtMatch(stop.district,district))
            return;

        selected.push(stop);

        const marker = L.marker(

            [
                stop.latitude,
                stop.longitude
            ],

            {

                icon: busStopIcon

            }

        );

        marker.bindPopup(

            popup(

                `🚌 ${stop.name}`,

                `
                <b>Тип:</b> ${stop.construction_type || "-"}<br>
                <b>Организация:</b> ${stop.organization_raw || "-"}<br>
                <b>Район:</b> ${stop.district}
                `

            )

        );

        busStopsLayer.addLayer(marker);

    });

    const counter = document.getElementById("busCount");

    if(counter)
        counter.innerHTML = selected.length;

    updateBusAnalytics(district, selected);

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateBusAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = busStops;

    } else {

        selected = busStops.filter(stop =>
            districtMatch(stop.district, district)
        );

    }

    document.getElementById("selectedDistrict").innerHTML =
        district ? (district.name_ru || district.name) : "Весь город";

    document.getElementById("districtBusCount").innerHTML = selected.length;

    document.getElementById("constructionType").innerHTML =
        selected.length ? (selected[0].construction_type || "-") : "-";

    document.getElementById("organization").innerHTML =
        selected.length ? (selected[0].organization_raw || "-") : "-";

    document.getElementById("shelterCount").innerHTML =
        selected.filter(x => x.has_shelter).length;

    document.getElementById("benchCount").innerHTML =
        selected.filter(x => x.has_bench).length;

    document.getElementById("rampCount").innerHTML =
        selected.filter(x => x.has_ramp).length;

    document.getElementById("boardCount").innerHTML =
        selected.filter(x => x.has_board).length;

}