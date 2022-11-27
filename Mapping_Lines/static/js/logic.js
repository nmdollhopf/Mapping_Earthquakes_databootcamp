// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// map is centered near center US ([lat, long], zoom level 0-18)
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// zoomed in on LA:
let map = L.map('mapid').setView([40.1733, -120.1794], 5);

// // alternate method to using .setView()
// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085], // LAX
    [37.6214, -122.3790], // SFO
    [40.7899, -111.9791], // SLC
    [47.4502, -122.3088] // SEA
  ];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
  }).addTo(map);

let newline = [
    [37.6214, -122.3790], // SFO
    [30.1975, -97.6664], // AUS
    [43.6777, -79.6248], // YYZ
    [40.6413, -73.7781] // JFK
];

L.polyline(newline, {
    color: "blue",
    "stroke-dasharray": "4 1",
    weight: 11
  }).addTo(map);
