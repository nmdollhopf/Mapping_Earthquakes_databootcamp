// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let lights = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// streets.addTo(map);

// Create a base layer that holds both maps.
// the key is what the user clicks on to select
// the value is the variable reference above
let baseMaps = {
    "Light": lights,
    "Dark": dark
  };

// create map for 14.5.4
let map = L.map('mapid', {
    center: [44.0, -80.0], // center on Toronto
    zoom: 2,
    layers: [lights]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/nmdollhopf/Mapping_Earthquakes_databootcamp/MappingGeoJSONPoints/Mapping_GeoJSON_Points/static/js/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(airportData).then((data) => {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
            console.log(layer);
            console.log(feature);
            layer.bindPopup(`<h3>Airport Code: ${feature.properties.faa}</h3> <hr> <h3>Airport Name: ${feature.properties.name}</h3>`);
        }}).addTo(map);
});
