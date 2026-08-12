let selectedTrafficOwner = "all";
let selectedTrafficDistrict = null;

async function initTrafficLights() {
    await loadAllTrafficLights();
    showOnlyLayer(trafficLightsLayer);
    updateTrafficAnalytics();
    initTrafficOrganizationFilters();
}

async function loadAllTrafficLights() {

    trafficLights = [];
    trafficLightsLayer.clearLayers();

    await loadMainTrafficLights();
    await loadTelekomsoftTrafficLights();

    renderTrafficLights();
    updateTrafficAnalytics();

}

async function loadMainTrafficLights() {

    try {

        const response =
            await fetch("/api/traffic-lights/geojson");

        if (!response.ok)
            throw new Error(`Основной GeoJSON: HTTP ${response.status}`);

        const geojson = await response.json();

        if (
            !geojson ||
            geojson.type !== "FeatureCollection"
        )
            throw new Error("Основной GeoJSON не является FeatureCollection");

        geojson.features.forEach((feature, index) => {

            if (
                !feature.geometry ||
                feature.geometry.type !== "Point"
            )
                return;

            const coordinates =
                feature.geometry.coordinates;

            const longitude = Number(coordinates[0]);
            const latitude = Number(coordinates[1]);

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            )
                return;

            const properties =
                feature.properties || {};

            trafficLights.push({

                ...properties,

                latitude,
                longitude,

                source: "main",

                source_index: index

            });

        });

    }

    catch (error) {

        console.error(
            "Ошибка основного GeoJSON:",
            error
        );

    }

}

async function loadTelekomsoftTrafficLights() {

    try {

        const response =
            await fetch(
                "/api/traffic-lights/telekomsoft-geojson"
            );

        if (!response.ok)
            throw new Error(
                `Telekomsoft GeoJSON: HTTP ${response.status}`
            );

        const geojson =
            await response.json();

        if (
            !geojson ||
            geojson.type !== "FeatureCollection"
        )
            throw new Error(
                "Telekomsoft GeoJSON не является FeatureCollection"
            );

        geojson.features.forEach((feature, index) => {

            if (
                !feature.geometry ||
                feature.geometry.type !== "Point"
            )
                return;

            const coordinates =
                feature.geometry.coordinates;

            const longitude =
                Number(coordinates[0]);

            const latitude =
                Number(coordinates[1]);

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            )
                return;

            const properties =
                feature.properties || {};

            trafficLights.push({

                ...properties,

                latitude,
                longitude,

                source: "telekomsoft",

                source_index: index

            });

        });

    }

    catch (error) {

        console.error(
            "Ошибка Telekomsoft:",
            error
        );

    }

}

function trafficLightOwner(light) {

    if (
        light.source === "telekomsoft"
    ) {

        return "Телекомсофт";

    }

    const owner =
        (
            light.owner ||
            light.Owner ||
            light.OWNER ||
            light["Прина"] ||
            ""
        )
        .toString()
        .trim();

    if (!owner)
        return "Телекомсофт";

    if (owner === "КСУБДД")
        return "ГАИ";

    if (owner === "СМЭУ")
        return "СМЭУ";

    return "Безхозные";

}

function trafficLightDistrict(light) {

    return (
        light.district ||
        light.District ||
        light.district_name ||
        light.Tuman ||
        light.tuman ||
        light["Туман"] ||
        ""
    )
    .toString()
    .trim();

}

function detectTrafficDistrict(
    latitude,
    longitude
) {

    if (
        !window.districts ||
        !districts.length
    )
        return null;

    const point =
        turf.point([
            longitude,
            latitude
        ]);

    for (const district of districts) {

        const geometry =
            safeJSON(
                district.geometry
            );

        if (!geometry)
            continue;

        try {

            if (
                turf.booleanPointInPolygon(
                    point,
                    geometry
                )
            ) {

                return district;

            }

        }

        catch (error) {

            console.warn(
                "Ошибка геометрии района:",
                error
            );

        }

    }

    return null;

}

function trafficDistrictMatch(
    light,
    district
) {

    if (!district)
        return true;

    if (
        light.source === "telekomsoft"
    ) {

        const detected =
            detectTrafficDistrict(
                light.latitude,
                light.longitude
            );

        if (!detected)
            return false;

        return (
            detected.name === district.name ||
            detected.name_ru === district.name_ru ||
            detected.name === district.name_ru ||
            detected.name_ru === district.name
        );

    }

    const objectDistrict =
        normalize(
            trafficLightDistrict(light)
        );

    const districtName =
        normalize(
            district.name
        );

    const districtRu =
        normalize(
            district.name_ru
        );

    return (
        objectDistrict === districtName ||
        objectDistrict === districtRu ||
        objectDistrict.includes(districtName) ||
        objectDistrict.includes(districtRu) ||
        districtName.includes(objectDistrict) ||
        districtRu.includes(objectDistrict)
    );

}

function renderTrafficLights() {

    trafficLightsLayer.clearLayers();

    const selected =
        trafficLights.filter(light => {

            if (
                selectedTrafficOwner !== "all"
            ) {

                if (
                    trafficLightOwner(light) !==
                    selectedTrafficOwner
                )
                    return false;

            }

            if (
                selectedTrafficDistrict
            ) {

                if (
                    !trafficDistrictMatch(
                        light,
                        selectedTrafficDistrict
                    )
                )
                    return false;

            }

            return true;

        });

    selected.forEach((light, index) => {

        const marker =
            L.marker(
                [
                    light.latitude,
                    light.longitude
                ],
                {
                    icon:
                        trafficLightIcon
                }
            );

        const name =
            light.name ||
            light.Name ||
            light.NAME ||
            light.object_name ||
            light.objectName ||
            light["Адрес"] ||
            `Светофор № ${index + 1}`;

        const id =
            light.id ||
            light.ID ||
            light.Id ||
            light.osm_id ||
            light.source_index ||
            "—";

        let district = "—";

        if (
            light.source === "telekomsoft"
        ) {

            const detected =
                detectTrafficDistrict(
                    light.latitude,
                    light.longitude
                );

            if (detected) {

                district =
                    detected.name_ru ||
                    detected.name ||
                    "—";

            }

        }

        else {

            district =
                trafficLightDistrict(light) ||
                "—";

        }

        const owner =
            trafficLightOwner(light);

        const status =
            light.status ||
            light.Status ||
            "ACTIVE";

        marker.bindPopup(

            popup(

                `🚦 ${name}`,

                `
                <b>ID:</b> ${id}
                <br>
                <b>Организация:</b> ${owner}
                <br>
                <b>Статус:</b> ${status}
                <br>
                <b>Район:</b> ${district}
                `

            )

        );

        trafficLightsLayer.addLayer(
            marker
        );

    });

    updateTrafficCounter(
        selected.length
    );

}

function initTrafficOrganizationFilters() {

    const checkboxes =
        document.querySelectorAll(
            ".organization-checkbox"
        );

    checkboxes.forEach(checkbox => {

        checkbox.addEventListener(
            "change",
            updateTrafficOrganizationLayers
        );

    });

    updateTrafficOrganizationLayers();

}

function updateTrafficOrganizationLayers() {

    const checkboxes =
        document.querySelectorAll(
            ".organization-checkbox"
        );

    const selectedOwners =
        Array.from(checkboxes)
            .filter(
                checkbox =>
                    checkbox.checked
            )
            .map(
                checkbox =>
                    checkbox.value
            );

    trafficLightsLayer.clearLayers();

    const selected =
        trafficLights.filter(light => {

            const owner =
                trafficLightOwner(light);

            if (
                !selectedOwners.includes(owner)
            )
                return false;

            if (
                selectedTrafficDistrict &&
                !trafficDistrictMatch(
                    light,
                    selectedTrafficDistrict
                )
            )
                return false;

            return true;

        });

    selected.forEach((light, index) => {

        const marker =
            L.marker(
                [
                    light.latitude,
                    light.longitude
                ],
                {
                    icon:
                        trafficLightIcon
                }
            );

        const name =
            light.name ||
            light.Name ||
            light.NAME ||
            light.object_name ||
            light.objectName ||
            light["Адрес"] ||
            `Светофор № ${index + 1}`;

        const id =
            light.id ||
            light.ID ||
            light.Id ||
            light.osm_id ||
            light.source_index ||
            "—";

        let district = "—";

        if (
            light.source === "telekomsoft"
        ) {

            const detected =
                detectTrafficDistrict(
                    light.latitude,
                    light.longitude
                );

            if (detected) {

                district =
                    detected.name_ru ||
                    detected.name ||
                    "—";

            }

        }

        else {

            district =
                trafficLightDistrict(light) ||
                "—";

        }

        marker.bindPopup(

            popup(

                `🚦 ${name}`,

                `
                <b>ID:</b> ${id}
                <br>
                <b>Организация:</b>
                ${trafficLightOwner(light)}
                <br>
                <b>Район:</b>
                ${district}
                `

            )

        );

        trafficLightsLayer.addLayer(
            marker
        );

    });

    updateTrafficAnalytics(
        selectedTrafficDistrict
    );

}

function updateTrafficCounter(count) {

    const trafficCount =
        document.getElementById(
            "trafficCount"
        );

    if (trafficCount)
        trafficCount.textContent =
            count;

    const districtTrafficCount =
        document.getElementById(
            "districtTrafficCount"
        );

    if (districtTrafficCount)
        districtTrafficCount.textContent =
            count;

}

function filterTrafficLights(district) {

    selectedTrafficDistrict =
        district || null;

    updateTrafficOrganizationLayers();

}

function resetTrafficLightFilters() {

    selectedTrafficDistrict =
        null;

    document
        .querySelectorAll(
            ".organization-checkbox"
        )
        .forEach(
            checkbox =>
                checkbox.checked = true
        );

    updateTrafficOrganizationLayers();

}

function updateTrafficAnalytics(
    district = selectedTrafficDistrict
) {

    let selected =
        trafficLights.filter(light => {

            if (
                district &&
                !trafficDistrictMatch(
                    light,
                    district
                )
            )
                return false;

            return true;

        });

    const checkboxes =
        document.querySelectorAll(
            ".organization-checkbox"
        );

    const selectedOwners =
        Array.from(checkboxes)
            .filter(
                checkbox =>
                    checkbox.checked
            )
            .map(
                checkbox =>
                    checkbox.value
            );

    selected =
        selected.filter(
            light =>
                selectedOwners.includes(
                    trafficLightOwner(light)
                )
        );

    const districtName =
        document.getElementById(
            "selectedDistrict"
        );

    if (districtName) {

        districtName.textContent =
            district
                ? (
                    district.name_ru ||
                    district.name ||
                    "Район"
                )
                : "Весь город";

    }

    const trafficCount =
        document.getElementById(
            "districtTrafficCount"
        );

    if (trafficCount) {

        trafficCount.textContent =
            selected.length;

    }

    const types =
        document.getElementById(
            "trafficTypes"
        );

    if (types) {

        types.textContent =
            "Нет данных";

    }

}

function filterTrafficLightsByOwner(owner) {

    selectedTrafficOwner =
        owner || "all";

    renderTrafficLights();

    updateTrafficAnalytics();

}