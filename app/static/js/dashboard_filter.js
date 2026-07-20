function filterDashboard(district) {

    trafficLightsLayer.clearLayers();
    busStopsLayer.clearLayers();
    roadsLayer.clearLayers();
    intersectionsLayer.clearLayers();
    pedestrianLayer.clearLayers();

    /* ============================
       Traffic Lights
    ============================ */

    trafficLights.forEach(light => {

        if (!districtMatch(light.district, district))
            return;

        const marker = L.marker(
            [light.latitude, light.longitude],
            { icon: trafficLightIcon }
        );

        trafficLightsLayer.addLayer(marker);

    });

    /* ============================
       Bus Stops
    ============================ */

    busStops.forEach(stop => {

        if (!districtMatch(stop.district, district))
            return;

        const marker = L.marker(
            [stop.latitude, stop.longitude],
            { icon: busStopIcon }
        );

        busStopsLayer.addLayer(marker);

    });

    /* ============================
       Roads
    ============================ */

    roads.forEach(road => {

        if (!districtMatch(road.district, district))
            return;

        const geometry = safeJSON(road.geometry);

        if (!geometry)
            return;

        roadsLayer.addLayer(

            L.geoJSON(geometry, {

                style: {

                    color: "#3b82f6",
                    weight: 2

                }

            })

        );

    });

    /* ============================
       Intersections
    ============================ */

    intersections.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        intersectionsLayer.addLayer(

            L.circleMarker(

                [item.latitude, item.longitude],

                {

                    radius:6,
                    color:"#ff9800",
                    fillColor:"#ff9800",
                    fillOpacity:1

                }

            )

        );

    });

    /* ============================
       Pedestrian
    ============================ */

    pedestrianCrossings.forEach(item => {

        if (!districtMatch(item.district, district))
            return;

        const geometry = safeJSON(item.geometry);

        if (!geometry)
            return;

        pedestrianLayer.addLayer(

            L.geoJSON(geometry,{

                style:{

                    color:"#9c27b0",
                    weight:4

                }

            })

        );

    });

    updateDashboardAnalytics(district);

}