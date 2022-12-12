# Mapping_Earthquakes_databootcamp

This is the Earthquake module material and challenge for Module 14 of the UNC Data Analysis Bootcamp


## Structure  

Each folder (e.g. Simple_Map/, Mapping_Single_Points/, etc) follows a section of the module (e.g. 14.1, 14.2, respectively). Each folder has a similar structure, consisting of an index.html file and a /static/ sub-folder. Index.html is the main page used to visualize the javascript and reference utilized libraries and files.  
Inside each /static/ folder are additional /css/style.css and /js/ files and sub-folders. The style.css file contains minor css style changes to index.html.  
The /js/ sub-folder is the bulk of the module material, with all of the javascript code to accomplish the module aims in logic.js. A config.js file containing an `API_KEY=""` for Mapbox should be included in the /js/ sub-folder but is excluded from public repositories. Some /js/ sub-folders have additional .json files that data is pulled from.  

That is, 
```
Folder/  
  - index.html
  - static/
     - css/
        - style.css
     - js/
        - logic.js
        - [config.js] 
        - [additionalData.json]
```


## Earthquakes Challenge  

The Earthquake_Challenge/ folder follows the same structure (see above) as the other folders. All data is pulled live, however, and there is no .json file in the /js/ sub-folder. Be sure to add a config.js file with a Mapbox API key in the /js/ folder before attempting to load index.html.

The challenge consisted of creating a page to show recent (last 7 days) earthquakes on a global map using JavaScript with the [Leaflet](https://leafletjs.com/reference.html) and [Mapbox](https://docs.mapbox.com/) APIs.   

Earthquake data is pulled live from the public [USGS GeoJSON feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and tectonic plate boundary data is from [Github user Fraxen](https://github.com/fraxen/tectonicplates/).  

There are three Mapbox Earth views to choose from: 
* a standard street view map,
* a combined satellite and street view map, 
* and a dark-mode street view map.  

These can be selected via radio buttons at the top right.  
<br>

There are 3 selectable layers (top right) to overlay on the map, all of which are loaded by default and can be selected off and back on.
* The data for all earthquakes in the last 7 days, provided as color-coded circles centered on the earthquake center with radius scaled by the magnitude; a colorbar is provided at the bottom right. Circle markers are clickable for more information on the earthquake center and magnitude.  
* An overlay of tectonic boundaries from a 2002 survey of plate boundaries. Each line can be clicked for the name of the boundary.
* An overlay of "major" earthquakes, defined as being of at least magnitude 4.5. This data is also represented as color-coded circles centered on the earthquake center with radius scaled by the magnitude. While no color-bar is provided for these, they are colored by the bins 4.5-5, 5-6, and 6+ magnitudes. These markers are also clickable for more information.

If the "all" earthquake data request fails, no map overlays will be able to be loaded as the tectonic boundaries and "major" earthquakes overlays are dependent on the "all" earthquake request. The "major" earthquake data and plate boundary data are independently requested of each other.
