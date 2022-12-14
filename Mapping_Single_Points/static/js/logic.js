// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// map is centered near center US ([lat, long], zoom level 0-18)
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// zoomed in on LA:
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// // alternate method to using .setView()
// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circle marker to the map for LA, CA
// measures radius in meters
// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

// alternate method:
// measures radius in pixels
// L.circleMarker([34.0522, -118.2437]).addTo(map);

L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: '#ffffa1'
}).addTo(map);
