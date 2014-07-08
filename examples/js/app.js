var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
var blackWhite = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png');
var watercolor = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg');

var baltimore = L.latLng(39.2856, -76.6090);

var map = L.map('map', {
  center: baltimore,
  zoom: 10,
  layers: [blackWhite, watercolor, osm]
});

var baseMaps = {
    "Black and White": blackWhite,
    "Watercolor": watercolor,
    "Open Street Maps": osm
};

L.control.layers(baseMaps).addTo(map);

var marker = L.marker(baltimore);

marker.bindPopup('A happy popup');

marker.addTo(map);