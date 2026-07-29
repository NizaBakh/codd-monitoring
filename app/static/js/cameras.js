/* =====================================================
   CAMERAS
===================================================== */

async function initCameras() {

    await loadCameras();

    showOnlyLayer(cameraLayer);

    console.log("cameras:", cameras.length);

    updateCameraAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadCameras() {

    try {

        const response = await fetch("/api/cameras/");

        if (!response.ok) {

            throw new Error("Camera API");

        }

        cameras = await response.json();
        if (PAGE === "/" || PAGE === "/dashboard") {

            return;

        }

        cameraLayer.clearLayers();

        const counter = document.getElementById("cameraCount");

        if (counter) {

            counter.innerHTML = cameras.length;

        }

        cameras.forEach(camera => {

            const marker = L.marker(

                [

                    camera.latitude,

                    camera.longitude

                ],

                {

                    icon: cameraIcon

                }

            );

            marker.bindPopup(

                popup(

                    `📷 Камера №${camera.number}`,

                    `
                    <b>🏙 Район:</b> ${camera.district}<br>
                    <b>📍 Адрес:</b> ${camera.address}
                    `

                )

            );

            cameraLayer.addLayer(marker);

        });

        updateCameraAnalytics();

    }

    catch (error) {

        console.error(error);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterCameras(district) {

    cameraLayer.clearLayers();

    let count = 0;

    cameras.forEach(camera => {

        if (!districtMatch(camera.district, district))
            return;

        count++;

        const marker = L.marker(

            [

                camera.latitude,

                camera.longitude

            ],

            {

                icon: cameraIcon

            }

        );

        marker.bindPopup(

            popup(

                `📷 Камера №${camera.number}`,

                `
                <b>🏙 Район:</b> ${camera.district}<br>
                <b>📍 Адрес:</b> ${camera.address}
                `

            )

        );

        cameraLayer.addLayer(marker);

    });

    map.addLayer(cameraLayer);

    const counter = document.getElementById("cameraCount");

    if (counter) {

        counter.innerHTML = count;

    }

    updateCameraAnalytics(district);

}

/* =====================================================
   ANALYTICS
===================================================== */

function updateCameraAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = cameras;

    } else {

        selected = cameras.filter(camera =>
            districtMatch(camera.district, district)
        );

    }

    /* Район */

    const districtName = document.getElementById("selectedDistrict");

    if (districtName) {

        districtName.innerHTML =
            (!district || (!district.name && !district.name_ru))
                ? "Весь город"
                : (district.name_ru || district.name);

    }

    /* Количество камер */

    const districtCameraCount = document.getElementById("districtCameraCount");

    if (districtCameraCount) {

        districtCameraCount.innerHTML = selected.length;

    }

    /* Количество адресов */

    const cameraAddresses = document.getElementById("cameraAddresses");

    if (cameraAddresses) {

        cameraAddresses.innerHTML = selected.length;

    }

    /* Информация */

    const cameraInfo = document.getElementById("cameraInfo");

    if (cameraInfo) {

        cameraInfo.innerHTML = `
            📷 Городские камеры<br>
            🏙 Районов: ${new Set(selected.map(c => c.district)).size}
        `;

    }

}