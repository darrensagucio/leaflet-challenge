var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(createCircleMarkers);

function createMap(earthquakes) {
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var myMap = L.map("map", {
    center: [39.0522, -118.2437],
    zoom: 5, 
    layers: [lightmap, earthquakes]
  });
  
  var legend = L.control({position: 'bottomright'});
  var colorArray = ["#80ffaa","#d5ff80","#ffc34d","#ff9933","#cc6600","#ff471a"];

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [-10, 10, 30, 50, 70, 90];
      labels = [];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colorArray[i] + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(myMap);
}


function createCircleMarkers(response) {

  var earthquakeArray = []; 

  for (var i = 0; i < response.features.length; i++) {
    
    var color = "";
    
    if (response.features[i].geometry.coordinates[2] > 90) {
      color = "#ff471a";
    }
    else if (response.features[i].geometry.coordinates[2] >=70 && response.features[i].geometry.coordinates[2] <=90) {
      color = "#cc6600";
    }
    else if (response.features[i].geometry.coordinates[2] >=50 && response.features[i].geometry.coordinates[2] <=70) {
      color = "#ff9933";
    }
    else if (response.features[i].geometry.coordinates[2] >=30 && response.features[i].geometry.coordinates[2] <=50) {
      color = "#ffc34d";
    }
    else if (response.features[i].geometry.coordinates[2] >=10 && response.features[i].geometry.coordinates[2] <=30) {
      color = "#d5ff80";
    }
    else if (response.features[i].geometry.coordinates[2] >=-10 && response.features[i].geometry.coordinates[2] <=10) {
      color = "#80ffaa";
    }
    else {
      color = "pink";
    }


    var eqCircleMarker = L.circleMarker([response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      weight: 0.50, 
      color: "black",
      fillColor: color,
      // Adjust radius
      radius: response.features[i].properties.mag * 4})
      .bindPopup("<h3> Location: " + response.features[i].properties.place + "</h3> <hr> <h3> Magnitude: " + response.features[i].properties.mag + "</h3> <h3> Depth Level: " + response.features[i].geometry.coordinates[2] + "</h3> ");
  
    earthquakeArray.push(eqCircleMarker)

  }
  
  console.log("Welcome To Console! Here Is The Data That Was Collected!")
  console.log(response)
  
  createMap(L.layerGroup(earthquakeArray));
}