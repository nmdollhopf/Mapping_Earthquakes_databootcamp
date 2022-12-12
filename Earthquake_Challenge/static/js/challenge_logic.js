// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// A third tile layer that will be the background of our map.
let darkMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark" : darkMap
};

// 1. Add a 2nd layer group for the tectonic plate data.
var allEarthquakes = new L.LayerGroup();
var tectonicLayer = new L.LayerGroup();
var majEarthquakes = new L.LayerGroup();


// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "All Earthquakes": allEarthquakes,
  "Tectonic Plates" : tectonicLayer,
  "Major Earthquakes" : majEarthquakes
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
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

  // This function determines the color of the marker based on the magnitude of the earthquake.
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
    return "#98ee00";
    }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: (feature, latlng) => {
      	//	console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: (feature, layer) => {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);

  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = () => {
    let div = L.DomUtil.create("div", "info legend");

    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    // console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);


  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then((data) => {
    L.geoJson(data, {
      style: {color: "royalblue", weight: 2.5},
      onEachFeature: (feature, layer) => {
        layer.bindPopup("Plate name: " + feature.properties.Name)
      }
    }).addTo(tectonicLayer);
    
    tectonicLayer.addTo(map);
  });

  // Major Earthquakes
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then((data) => {
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into two separate functions
    // to calculate the color and radius.
    function styleInfoMajs(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColorMajs(feature.properties.mag),
        color: "#000000",
        radius: getRadiusMajs(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }

    // This function determines the color of the marker based on the magnitude of the earthquake.
    function getColorMajs(magnitude) {
      if (magnitude > 6) {
        return "#644bd8";
      }
      else if (magnitude > 5) {
        return "#a99ffc";
      }
      else {
        return "#ccc7ff";
      }
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // No Earthquakes will be lower than 4.5, so get rid of mag==0 condition.
    function getRadiusMajs(magnitude) {
      return magnitude * 4;
    }

    L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: (feature, latlng) => {
      	//	console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfoMajs,
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
      onEachFeature: (feature, layer) => {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(majEarthquakes);

    majEarthquakes.addTo(map);

  });

});

