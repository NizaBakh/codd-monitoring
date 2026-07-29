/* =====================================================
   TELEKOMSOFT
===================================================== */

async function initTelekomsoft() {

    await loadTelekomsoft();

    showOnlyLayer(telekomsoftLayer);

    console.log("telekomsoft:", telekomsoft.length);
    updateTelekomsoftAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadTelekomsoft() {

    try {

        const response = await fetch("/api/telekomsoft/");

        if (!response.ok) {

            throw new Error("Telekomsoft API");

        }

        telekomsoft = await response.json();
        if (PAGE === "/" || PAGE === "/dashboard") {

            return;

        }
        
        telekomsoftLayer.clearLayers();

        const counter = document.getElementById("telekomsoftCount");

        if (counter) {

            counter.innerHTML = telekomsoft.length;
        }

        telekomsoft.forEach(item => {

            const marker = L.marker(

                [

                    item.latitude,

                    item.longitude

                ],

                {

                    icon: cameraIcon

                }

            );

          marker.bindPopup(

            popup(

                `📡 ${item.type}`,

                `
                <b>№ объекта:</b> ${item.number}<br>
                <b>Район:</b> ${item.district}<br>
                <b>Адрес:</b> ${item.address}<br><br>

                <b>Строительство:</b> ${item.construction_status}<br>
                <b>Видимость:</b> ${item.system_visibility}<br>
                <b>Контроллер:</b> ${item.controller_status}<br>
                <b>Предприниматель:</b> ${item.entrepreneur}
                `

            )

        );

            telekomsoftLayer.addLayer(marker);
        });

    }

    catch (error) {

        console.error(error);

    }

}
/* =====================================================
   FILTER
===================================================== */

function filterTelekomsoft(district) {
    
    console.log("FILTER TELEKOMSOFT");

    telekomsoftLayer.clearLayers();

    let count = 0;

    telekomsoft.forEach(item => {
        if (item.district.includes("Serg")) {
        console.log(
            item.district,
            normalize(item.district),
            normalize(district.name),
            normalize(district.name_ru),
            districtMatch(item.district, district)
        );
    }

        if (!districtMatch(item.district, district))
            return;

        count++;

        const marker = L.marker(

            [
                item.latitude,
                item.longitude
            ],

            {
                icon: cameraIcon
            }

        );

        marker.bindPopup(

            popup(

                `📡 ${item.type}`,

                `
                <b>№ объекта:</b> ${item.number}<br>
                <b>Район:</b> ${item.district}<br>
                <b>Адрес:</b> ${item.address}<br><br>

                <b>Строительство:</b> ${item.construction_status}<br>
                <b>Видимость:</b> ${item.system_visibility}<br>
                <b>Контроллер:</b> ${item.controller_status}<br>
                <b>Предприниматель:</b> ${item.entrepreneur}
                `

            )

        );

        telekomsoftLayer.addLayer(marker);
    });

    const counter = document.getElementById("telekomsoftCount");

    if (counter) {

        counter.innerHTML = count;

    }

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateTelekomsoftAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = telekomsoft;

    } else {

        selected = telekomsoft.filter(item =>
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

    const counter = document.getElementById("districtTelekomsoftCount");

    if (counter) {

        counter.innerHTML = selected.length;

    }

    const types = {};

    selected.forEach(item => {

        const type = item.type || "Неизвестно";

        types[type] = (types[type] || 0) + 1;

    });

    const typeBlock = document.getElementById("telekomsoftTypes");

    if (typeBlock) {

        typeBlock.innerHTML = Object.entries(types)

            .map(([name, count]) => `• ${name}: ${count}`)

            .join("<br>");

    }

    const info = document.getElementById("telekomsoftInfo");

    if (info) {

        const completed = selected.filter(x =>
            (x.construction_status || "").toLowerCase().includes("зав")
        ).length;

        info.innerHTML = `
            📡 Всего объектов: ${selected.length}<br>
            ✅ Завершено: ${completed}
        `;

    }

}