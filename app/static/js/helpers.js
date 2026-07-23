/* =====================================================
   HELPERS
===================================================== */

function normalize(text) {

    text = (text || "")
        .toString()
        .toLowerCase()
        .trim();

    text = text
        .replaceAll("ʻ", "")
        .replaceAll("ʼ", "")
        .replaceAll("'", "")
        .replaceAll("`", "")

        .replaceAll("ў", "у")
        .replaceAll("ғ", "г")
        .replaceAll("қ", "к")
        .replaceAll("ҳ", "х")
        .replaceAll("ё", "е")

        .replaceAll("-", " ")

        .replaceAll(" tumani", "")
        .replaceAll(" тумани", "")
        .replaceAll(" район", "")

        .replace(/\s+/g, " ")
        .trim();

    if (text === "янгихаёт")
        text = "янгихает";

    if (text === "yangihayot")
        text = "янгихает";

    return text;
}

/* =====================================================
   District compare
===================================================== */

function districtMatch(objectDistrict, district) {

    const obj = normalize(objectDistrict);

    const variants = [

        normalize(district.name),

        normalize(district.name_ru)

    ];

    return variants.some(v =>

        obj === v ||

        obj.includes(v) ||

        v.includes(obj)

    );

}

/* =====================================================
   JSON
===================================================== */

function safeJSON(value) {

    if (!value)
        return null;

    try {

        if (typeof value === "string") {

            return JSON.parse(value);

        }

        return value;

    }

    catch (e) {

        console.error("JSON parse error:", e);

        return null;

    }

}

/* =====================================================
   Popup
===================================================== */

function popup(title, body) {

    return `

        <div class="popup">

            <h6>${title}</h6>

            ${body}

        </div>

    `;

}

/* =====================================================
   Layers
===================================================== */

function showOnlyLayer(activeLayer) {

    const layers = [

        trafficLightsLayer,
        busStopsLayer,
        intersectionsLayer,
        roadsLayer,
        pedestrianLayer,
        bridgeTunnelLayer,
        bicycleLaneLayer

    ];

    layers.forEach(layer => {

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }

    });

    if (activeLayer) {
        map.addLayer(activeLayer);
    }

}