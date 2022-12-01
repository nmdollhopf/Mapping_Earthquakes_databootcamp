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
    center: [43.7, -79.3], // center on Toronto
    zoom: 11,
    layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/nmdollhopf/Mapping_Earthquakes_databootcamp/main/Mapping_GeoJSON_Polygons/static/js/torontoNeighborhoods.json"

// abstract the styling
let myStyle = { color: "blue", weight: 1, fillColor: "yellow"}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then((data) => {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
        style: myStyle,
        onEachFeature: (feature, layer) => {
            // console.log(layer);
            // console.log(feature);
            layer.bindPopup(`<h3>Neighborhood: ${feature.properties.AREA_NAME}</h3>`);
        }}
        ).addTo(map);
});
