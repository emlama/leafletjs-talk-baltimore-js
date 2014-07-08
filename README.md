This is where I'll keep all of my notes for an upcoming LeafletJS talk for [this event](http://www.meetup.com/bmorejs/events/188674662/?action=detail&trax_also_in_algorithm2=combo&eventId=188674662&traxDebug_also_in_algorithm2_picked=combo)

# Synopsis
Come join Matt as he talks about LeafletJS, the open-source version of google maps that is used by Flickr, Foursquare, and Mapbox.

During his talk Matt will dive into Leaflet's API, strategies for structuring your applications, and how to write your own plugin.

# Slides

## Three Reasons to give Leaflet a try
1. It's open source but backed by Mapbox. You can be confident that it will be maintained.
2. It's designed with "simplicity, performance and usability in mind". The API is easy to digest and it's really easy to extend.
3. It's solid. It powers Flickr, Foursquare, Pintrest, and so on.

## How does it all work?
Well first, there's all the data you have.
- PostGIS, MongoDB

Second, you sometimes want to do complicated calculations–directions and
- Google Maps API, MapQuest API

Talk about the front-end that pulls it all together.
- Leaflet.

## Leaflet Likes Objects
Preview the main types of objects

## Easy Start with Leaflet
```javascript
var map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 5,
  worldCopyJump: true
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);
```

## Make your own Markers, Icons, and Popups

### Markers

As simple as:
```javascript
L.marker([50.5, 30.5]).addTo(map)
```

And you got all of these events:

```javascript
click
dblclick
mousedown
mouseover
mouseout
contextmenu
dragmenu
dragstart
drag
dragend
move
add
remove
popupopen
popupclose
```

Take a look at all of the functions a marker has.

### Icons

Two options `L.Icon` and `L.divIcon`

```javascript
// L.icon
var myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowRetinaUrl: 'my-icon-shadow@2x.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
})
```

–or–

```javascript
// L.divIcon
var myIcon = L.divIcon({
  className: new_class,
  iconSize: iSize,
  iconAnchor: iAnchor,
  popupAnchor: [38,38]
})
```

And then include it in when you make your marker.

`L.marker([lat, lng], {icon: myIcon}).addTo(map)`

### Popups are simple

Don't do silly things like try and manage your own popups...ahem!

```javascript
function markerClickAction (uid,lat,lng,type) {

  var k = '.'+uid,
    obj = $(k);

  //console.log( type, obj.hasClass('open-leaflet') );

  if( !obj.hasClass('open-leaflet') ) {
    //pans to center of map
    map.panTo(new L.LatLng(lat,lng));

    //hides open popups
    $('.open_project, .open_expert').fadeOut().closest('.leaflet-marker-icon').removeClass('open-leaflet');

    //opens correct popup
    obj.addClass('open-leaflet');
    var klass = '.open_'+type;

    //console.log( obj.closest(klass) );

    obj.find(klass).fadeIn().on('click', 'button.close',function(event){
      $('.open_project, .open_expert').fadeOut().closest('.leaflet-marker-icon').removeClass('open-leaflet');
      event.stopPropagation();
      return false;
    }).on('click', 'a', function(event){
      //console.log( 'goto ' + $(this).attr('href') );
      event.stopPropagation();
    });
  }
}
```

Just do this:

marker.bindPopup(popupContent);

marker.on('click', function () {
  this.openPopup();
});

## Leaflet Utility Functions
Before reaching for underscore, check `L.Util`.

```javascript
// Leaflet
L.Util.extend(destination, source)

// Underscore
_.extend(destination, *sources)


// Leaflet
L.Util.bind(function, object)

// Underscore
_.bind(function, object, *arguments)


// Leaflet
L.Util.limitExecByInterval(function, wait, [context])

// Underscore
_.debounce(function, wait, [immediate])


// Leaflet
L.Util.setOptions(object, options)

// Underscore
_.defaults(object, *defaults)


// Leaflet
L.Util.template(templateString, data)

// Underscore
_.template(templateString, [data], [settings])
```

## Leaflet Layers
Discuss different type of Leaflet layers

## Leaflet Controls

## Leaflet Markers (UI Layer)

## Leaflet Popups (UI Layer)

## Leaflet Mixins

```javascript
L.Util.VIPUtils = L.Util.extend({

  layerToJson: function (layer) {
    return jQuery.toJSON( layer.toGeoJSON() );
  },

  parseRawReverseGeoCode: function(response) {
    var location = response.results[0].locations[0];
    var html = "";

    if (location.street !== "") { html = location.street; }

    if (location.adminArea5 !== "") {
      if (html !== "") { html += ", "; }
      html += location.adminArea5;
    }

    // County, doesn't seem to be necesary
    if (location.adminArea4 !== "") { html += ", " + location.adminArea4; }

    if (location.adminArea3 !== "") { html += ", " + location.adminArea3; }

    if (location.adminArea1 !== "") { html += ", " + location.adminArea1; }

    return html;
  },

  // Reverse geocodes an address
  reverseGeocode: function (lat, lng, callback) {
    $.ajax({
      type: 'GET',
      url: '/api/reverse_geocode',
      context: this,
      data: {
        'lat': lat,
        'lng': lng
      },
      dataType: 'json',
      success: callback,
      error: function(jqXHR, textStatus, error) {
        throw new Error('Error fetching address');
      }
    });
  }
});
```

## Demo Time
- Show data management from the server
- Show using a factory method to create a map that is reusable throughout a website
- Show updating a bunch of stuff outside of the map
- Show drawing and updating stuff on the map
