// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let satstreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// streets.addTo(map);

// Create a base layer that holds both maps.
// the key is what the user clicks on to select
// the value is the variable reference above
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satstreets
  };

// create map for 14.5.4
let map = L.map('mapid', {
    center: [39.5, -98.5], // center on USA
    zoom: 3,
    layers: [streets]
});

// ==== Logic steps 1-3: ====== moved below for logic step 4+
// // Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);


// ======================================================================
// ================== Logic Step 1 ======================================
// ======================================================================
// simply plot the raw geojson features
// Grabbing our GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });


// ======================================================================
// ================== Logic Step 2 ======================================
// ======================================================================
// change each geojson point to a layer using pointToLayer
// Grabbing our GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
//     //console.log(data);

//     // This function returns the style data for each of the earthquakes we plot on
//     // the map. We pass the magnitude of the earthquake into a function
//     // to calculate the radius.
//     function styleInfo(feature) {
//         return {
//             opacity: 1,
//             fillOpacity: 1,
//             fillColor: "#ffae42",
//             color: "#000000",
//             radius: getRadius(feature.properties.mag),
//             stroke: true,
//             weight: 0.5
//         };
//     }

//     // This function determines the radius of the earthquake marker based on its magnitude.
//     // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
//     function getRadius(magnitude) {
//         if (magnitude === 0) {
//             return 1;
//         }
//         return magnitude * 4;
//     }

//      // Creating a GeoJSON layer with the retrieved data.
//      L.geoJSON(data, {
//         pointToLayer: (feature, latlng) => {
//             console.log(data);
//             return L.circleMarker(latlng);
//         },
//         style: styleInfo
//     }).addTo(map);
// });



// ======================================================================
// ================== Logic Step 3 ======================================
// ======================================================================
// change each geojson point to a layer using pointToLayer
// add popup info and color-code circle markers
// Grabbing our GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
//     //console.log(data);

//     // This function returns the style data for each of the earthquakes we plot on
//     // the map. We pass the magnitude of the earthquake into a function
//     // to calculate the radius.
//     function styleInfo(feature) {
//         return {
//             opacity: 1,
//             fillOpacity: 1,
//             fillColor: getColor(feature.properties.mag),
//             color: "#000000",
//             radius: getRadius(feature.properties.mag),
//             stroke: true,
//             weight: 0.5
//         };
//     }

//     // This function determines the color of the circle based on the magnitude of the earthquake.
//     function getColor(magnitude) {
//         if (magnitude > 5) {
//             return "#ea2c2c";
//         }
//         else if (magnitude > 4) {
//             return "#ea822c";
//         }
//         else if (magnitude > 3) {
//             return "#ee9c00";
//         }
//         else if (magnitude > 2) {
//             return "#eecc00";
//         }
//         else if (magnitude > 1) {
//             return "#d4ee00";
//         }
//         else { return "#98ee00";
//         }
//     }

//     // This function determines the radius of the earthquake marker based on its magnitude.
//     // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
//     function getRadius(magnitude) {
//         if (magnitude === 0) {
//             return 1;
//         }
//         return magnitude * 4;
//     }

//      // Creating a GeoJSON layer with the retrieved data.
//      L.geoJSON(data, {
//         pointToLayer: (feature, latlng) => {
//             console.log(data);
//             return L.circleMarker(latlng);
//         },
//         style: styleInfo,
//         // We create a popup for each circleMarker to display the magnitude and
//         //  location of the earthquake after the marker has been created and styled.
//         onEachFeature: (feature, layer) => {
//             layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//         }
//     }).addTo(map);
// });



// ======================================================================
// ================== Logic Step 4 ======================================
// ======================================================================
// change each geojson point to a layer using pointToLayer
// add popup info and color-code circle markers
// make earthquake data an overlay

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Grabbing our GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
    //console.log(data);

    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        else if (magnitude > 4) {
            return "#ea822c";
        }
        else if (magnitude > 3) {
            return "#ee9c00";
        }
        else if (magnitude > 2) {
            return "#eecc00";
        }
        else if (magnitude > 1) {
            return "#d4ee00";
        }
        else { return "#98ee00";
        }
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

     // Creating a GeoJSON layer with the retrieved data.
     L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: (feature, layer) => {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // then add earthquakes to map
    earthquakes.addTo(map);

// ================== Logic Step 5 ======================================
// add legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var magnitudes = [0, 1, 2, 3, 4, 5];
        var colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(map);
});
