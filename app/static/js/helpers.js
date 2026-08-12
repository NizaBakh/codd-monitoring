/* =====================================================
   HELPERS
===================================================== */

function normalize(text) {

    text = (text || "")
        .toString()
        .toLowerCase()
        .trim()

        // апострофы
        .replace(/['‘’ʻʼ`]/g, "")

        // узбекские буквы
        .replace(/ў/g, "у")
        .replace(/ғ/g, "г")
        .replace(/қ/g, "к")
        .replace(/ҳ/g, "х")
        .replace(/ё/g, "е")

        // дефисы
        .replace(/-/g, " ")

        // окончания
        .replace(/ tumani/g, "")
        .replace(/ тумани/g, "")
        .replace(/ район/g, "")

        .replace(/\s+/g, " ")
        .trim();

    // убрать пробелы полностью
    text = text.replace(/\s/g, "");

    // =====================================================
    // Синонимы районов
    // =====================================================

    switch (text) {

        case "сирғали":
        case "сиргали":
        case "sirgali":
        case "сергели":   
        case "sirghali":
        case "sergeli":
            return "sergeli";

        case "мирзоулугбек":
        case "мирзоулуғбек":
        case "mirzoulugbek":
        case "mirzoulugbek":
            return "mirzoulugbek";

        case "янгихаёт":
        case "янгихает":
        case "yangihayot":
            return "yangihayot";

        default:
            return text;

    }

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

    const result = variants.some(v =>

        obj === v ||

        obj.includes(v) ||

        v.includes(obj)

    );


    if (
        normalize(district.name) === "sergeli"
    ) {

        console.log(
            "SERGELI CHECK:",
            {
                objectDistrict,
                obj,
                districtName: district.name,
                districtRu: district.name_ru,
                variants,
                result
                }
        );

    }


    return result;
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
        bicycleLaneLayer,
        parkingLayer,
        cameraLayer,
        

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
window.normalize = normalize;