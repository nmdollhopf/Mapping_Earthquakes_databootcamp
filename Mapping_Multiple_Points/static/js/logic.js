// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// map is centered near center US ([lat, long], zoom level 0-18)
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// zoomed in on LA:
let map = L.map('mapid').setView([40.7, -94.5], 4);

// // alternate method to using .setView()
// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


//  array of cities that will be used for markers is in cities.js
let cityData = cities 

// Loop through the cities array and create one marker for each city.
cityData.forEach((city) => {
    console.log(city)
    L.circleMarker(city.location, {radius: city.population/200000})
    .addTo(map)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
   });
