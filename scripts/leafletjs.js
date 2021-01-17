//debugger;
var mymap = L.map("mapid").setView([0, 0], 1);

function getColor(d) {
  return d > 7
    ? "#800026"
    : d > 6
    ? "#BD0026"
    : d > 5
    ? "#E31A1C"
    : d > 3
    ? "#FC4E2A"
    : d > 3
    ? "#FD8D3C"
    : d > 2
    ? "#FEB24C"
    : d > 1
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  return {
    //fillColor: getColor(feature.properties.map_color8),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.3
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.3
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  window.clocks = [];
  window.clocks.push(layer.feature.properties.tz_name1st);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}
function zoomToFeature(e) {
  mymap.fitBounds(e.target.getBounds());
  console.log("test1");
}

// ... our listeners
function onEachFeature_TimeZones(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
    //click: zoomToFeature
  });
}

// Time zone data
var geojson = L.geoJSON(geoJSON_TimeZones, {
  style: style,
  onEachFeature: onEachFeature_TimeZones
}).addTo(mymap);

// Base Map Data
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1
  // accessToken: "your.mapbox.access.token"
}).addTo(mymap);

// Novemner 2020 Challenge COde
// var marker = L.marker([51.5, -0.09]).addTo(mymap);

// var circle = L.circle([51.508, -0.11], {
//   color: "red",
//   fillColor: "#f03",
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(mymap);

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(mymap);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// var popup = L.popup()
//   .setLatLng([51.5, -0.09])
//   .setContent("I am a standalone popup.")
//   .openOn(mymap);

// //var popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(mymap);
// }

// mymap.on("click", onMapClick);

// December 2020 Challenge
mymap.setView([39.74739, -105], 13);
var geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!"
  },
  geometry: {
    type: "Point",
    coordinates: [-104.99404, 39.75621]
  }
};

L.geoJSON(geojsonFeature).addTo(mymap);

var myLines = [
  {
    type: "LineString",
    coordinates: [
      [-100, 40],
      [-105, 45],
      [-110, 55]
    ]
  },
  {
    type: "LineString",
    coordinates: [
      [-105, 40],
      [-110, 45],
      [-115, 55]
    ]
  }
];

var myStyle = {
  color: "#ff7800",
  weight: 5,
  opacity: 0.65
};

L.geoJSON(myLines, {
  style: myStyle
}).addTo(mymap);

var states = [
  {
    type: "Feature",
    properties: { party: "Republican" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-104.05, 48.99],
          [-97.22, 48.98],
          [-96.58, 45.94],
          [-104.03, 45.94],
          [-104.05, 48.99]
        ]
      ]
    }
  },
  {
    type: "Feature",
    properties: { party: "Democrat" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-109.05, 41.0],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.0]
        ]
      ]
    }
  }
];

L.geoJSON(states, {
  style: function (feature) {
    switch (feature.properties.party) {
      case "Republican":
        return { color: "#ff0000" };
      case "Democrat":
        return { color: "#0000ff" };
      default:
        return { color: "white" };
    }
  }
}).addTo(mymap);

function onEachFeature_Fields(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
}

var geojsonFeature_Fields = [
  {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "This is where the Rockies play!",
      show_on_map: true
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621]
    }
  },
  {
    type: "Feature",
    properties: {
      name: "Busch Field",
      show_on_map: false
    },
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621]
    }
  }
];

L.geoJSON(geojsonFeature_Fields, {
  onEachFeature: onEachFeature_Fields,
  filter: function (feature, layer) {
    return feature.properties.show_on_map;
  }
}).addTo(mymap);
