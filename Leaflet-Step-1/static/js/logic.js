// var myMap = L.map("map", {
//     center: [39.0522, -118.2437],
//     zoom: 5
// });

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   // id: "light-v10",
//   accessToken: API_KEY
// }).addTo(myMap);

console.log("hi");

// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// }).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// d3.json(url).then(function(data) {
//   // Check Data
//   console.log(data);
//   console.log(data.features[0].geometry.coordinates[0]);
  
//   // Send Data To Function
//   createCircleMarkers(data);
// });

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

}


function createCircleMarkers(response) {

  var earthquakeArray = []; 

  
  for (var i = 0; i < response.features.length; i++) {
    
    var eqCircleMarker = L.circleMarker([response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      weight: 0.50, 
      // stroke: false,
      color: "black",
      fillColor: "green",
      // Adjust radius
      radius: response.features[i].properties.mag * 4})
      .bindPopup("<h3> Location: " + response.features[i].properties.place + "</h3> <hr> <h3> Magnitude: " + response.features[i].properties.mag + "</h3> <h3> Depth Level: " + response.features[i].geometry.coordinates[2] + "</h3> ");
  
    earthquakeArray.push(eqCircleMarker)

  }
  
  console.log(response)
  console.log(response.features[0].properties.mag)
  console.log(response.features[0].geometry.coordinates[1])
  console.log("hi");
  console.log(earthquakeArray);
  console.log(response.features.length)
  
  createMap(L.layerGroup(earthquakeArray));
}
