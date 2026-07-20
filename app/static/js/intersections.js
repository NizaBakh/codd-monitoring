/* =====================================================
   INTERSECTIONS
===================================================== */

async function initIntersections() {

    await loadIntersections();

    showOnlyLayer(intersectionsLayer);

    console.log("intersections:", intersections.length);

    updateIntersectionAnalytics();

}

/* =====================================================
   LOAD
===================================================== */

async function loadIntersections() {

    try {

        const response = await fetch("/api/intersections/");

        if (!response.ok)
            throw new Error("Intersection API");

        intersections = await response.json();

        intersectionsLayer.clearLayers();

        const counter = document.getElementById("intersectionCount");

        if (counter)
            counter.innerHTML = intersections.length;

        intersections.forEach(item => {

            const marker = L.circleMarker(

                [item.latitude, item.longitude],

                {

                    radius: 6,

                    color: "#ff9800",

                    fillColor: "#ff9800",

                    fillOpacity: 1,

                    weight: 2

                }

            );

            marker.bindPopup(

                popup(

                    `➕ ${item.name}`,

                    `
                    <b>Район:</b> ${item.district}<br>
                    <b>ID:</b> ${item.object_id}
                    `

                )

            );

            intersectionsLayer.addLayer(marker);

        });

    }

    catch (e) {

        console.error(e);

    }

}

/* =====================================================
   FILTER
===================================================== */

function filterIntersections(district) {

    intersectionsLayer.clearLayers();

    const selected = [];

    intersections.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        selected.push(item);

        const marker = L.circleMarker(

            [item.latitude, item.longitude],

            {

                radius: 6,

                color: "#ff9800",

                fillColor: "#ff9800",

                fillOpacity: 1,

                weight: 2

            }

        );

        marker.bindPopup(

            popup(

                `➕ ${item.name}`,

                `
                <b>Район:</b> ${item.district}
                `

            )

        );

        intersectionsLayer.addLayer(marker);

    });

    const counter = document.getElementById("intersectionCount");

    if (counter)
        counter.innerHTML = selected.length;

    updateIntersectionAnalytics(district, selected);
    showOnlyLayer(intersectionsLayer);
}

/* =====================================================
   ANALYTICS
===================================================== */

function updateIntersectionAnalytics(district = null) {

    let selected;

    if (!district || (!district.name && !district.name_ru)) {

        selected = intersections;

    } else {

        selected = intersections.filter(obj =>
            districtMatch(obj.district, district)
        );

    }

    document.getElementById("selectedDistrict").innerHTML =
        district ? (district.name_ru || district.name) : "Весь город";

    document.getElementById("districtIntersectionCount").innerHTML =
        selected.length;

}