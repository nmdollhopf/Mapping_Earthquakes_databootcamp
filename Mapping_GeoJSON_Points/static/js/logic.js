// Add console.log to check to see if our code is working.
console.log("working");

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Create the map object with a center and zoom level.
// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);
// For 14.5.3: Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);
// moved below for 14.5.4

// // Grabbing only our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// // Grabbing our GeoJSON data with pointToLayer callback function.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: (feature, latlng) => {
//       console.log(feature);
//       console.log(latlng);
//       return L.marker(latlng).bindPopup(`<h3> ${feature.properties.name} </h3> <hr> <h4> ${feature.properties.city}, ${feature.properties.country} </h4>`);
//     }
//   }).addTo(map);

//   // Grabbing our GeoJSON data with onEachFeature callback function.
// L.geoJson(sanFranAirport, {
//     onEachFeature: (feature, layer) => {
//         console.log(layer);
//         console.log(feature);
//         layer.bindPopup(`<h3>Airport Code: ${feature.properties.faa}</h3> <hr> <h3>Airport Name: ${feature.properties.name}</h3>`);
//     }
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    "Street": streets,
    "Dark": dark
  };

// create map for 14.5.4
let map = L.map('mapid', {
    center: [30.0, 30.0],
    zoom: 2,
    layers: [streets]
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
