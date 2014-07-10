layout: true
class: middle

---

class:middle, center

# The "We're back" event!

![logo](images/bmorejs-shield.png)

---

# Who the #^!! is this ginger?
*or why you should (or should not) listen to me*

---

# *Get on with it already*

---

## Three Reasons to give Leaflet a try

1. Open Source with serious backers
2. Simple and easy to use API
3. Powers Flickr, Foursquare, Pintrest, and so on.

---

## What's in the ecosystem?

- Your Geo Data (PostGIS, MongoDB)
- Map Tiles (Google, MapBox, OpenStreetMaps)
- Pull it together client side (Google Maps, Leaflet, Open Layers)

---

## Hello World
```javascript
var map = L.map('map', {
  center: [39.2856, -76.6090],
  zoom: 10,
  worldCopyJump: true
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);
```

---
## And You Get This

```html
<div class="leaflet-container">
  <div class="leaflet-map-pane">
    <div class="leaflet-tile-pane">
      <div class="leaflet-layer"></div>
    </div>
    <div class="leaflet-objects-pane">
      <div class="leaflet-shadow-pane"></div>
      <div class="leaflet-overlay-pane"></div>
      <div class="leaflet-marker-pane"></div>
      <div class="leaflet-popup-pane"></div>
    </div>
  </div>
  <div class="leaflet-control-container"></div>
</div>
```

---

# Make your own Markers, Icons, and Popups

---

## Markers

As simple as:
```javascript
var marker = L.marker([50.5, 30.5]);
marker.addTo(map);
```

*really just a top level object*

---

## And Events

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

*Plus [functions to boot](http://leafletjs.com/reference.html#marker-addto).*

---

class:middle
# Icons
*AKA You don't want those blue markers*

Two options `L.Icon` and `L.divIcon`

---

## L.Icon
```javascript
// Use this if you have an image you want to use
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
});
```

---

## L.divIcon

```javascript
// Use this if you want to use CSS3 for styling it
var myIcon = L.divIcon({
  className: new_class,
  iconSize: iSize,
  iconAnchor: iAnchor,
  popupAnchor: [38,38]
});
```

---

class:middle

And then include it in when you make your marker.

```javascript
L.marker([lat, lng], {icon: myIcon}).addTo(map);
```

---

class: middle

# Popups are simple

---
```javascript
function markerClickAction (uid,lat,lng,type) {

  var k = '.'+uid, obj = $(k);

  if ( !obj.hasClass('open-leaflet') ) {

    map.panTo(new L.LatLng(lat,lng));

    $('.open_project, .open_expert').fadeOut()
      .closest('.leaflet-marker-icon')
      .removeClass('open-leaflet'); //hides open popups

    obj.addClass('open-leaflet'); //opens correct popup
    var klass = '.open_'+type;

    obj.find(klass).fadeIn().on('click', 'button.close',
    function (event) {
      $('.open_project, .open_expert').fadeOut()
        .closest('.leaflet-marker-icon')
        .removeClass('open-leaflet');
      event.stopPropagation();
      return false;
    }).on('click', 'a', function(event){
      event.stopPropagation();
    });
  }
}
```

---

## Just do this

```javascript
marker.bindPopup(popupContent);

marker.on('click', function () {
  this.openPopup();
});
```

*I was able to do this by shoving the whole popup into `L.divIcon`.* **Totally bad form.**

---

## Other things to read up on

* Methods for [modifying](http://leafletjs.com/reference.html#map-set-methods) and [getting](http://leafletjs.com/reference.html#map-get-methods) the state of the Map
* [Conversion methods](http://leafletjs.com/reference.html#map-conversion-methods) and [Transformations](http://leafletjs.com/reference.html#transformation)
* Take a look at [Controls](http://leafletjs.com/reference.html#control)
* [Vector layers](http://leafletjs.com/reference.html#path)

---

# Words of warning

1. Start with Leaflet Objects
2. Be wary of over-reliance on outside libraries
  * (jQuery &amp; Underscore)
3. There was a third one but I honestly can't remember it

---

# Leaflet Plugins, Mixins, and Extensions

They're all the same thing really. The API provides a lot of the basic building blocks for making what you need.

---

## It's got Class
JavaScript, not so much...things Leaflet will do for you:

* Proper inheritance with `extend`
* Options (see `setOptions`)
* Include mixins (e.g. L.events)
* Define Statics
* Constructor Hooks (modify other parts of Leaflet on init)

---

```javascript
var MyClass = L.Class.extend({
    initialize: function (greeter) {
        this.greeter = greeter;
        // class constructor
    },

    greet: function (name) {
        alert(this.greeter + ', ' + name)
    }
});

// create instance of MyClass, passing "Hello" to the constructor
var a = new MyClass("Hello");

// call greet method, alerting "Hello, World"
a.greet("World");
```

---

## Events

```javascript
addEventListener( <String> type, <Function> fn, <Object> context? )
addOneTimeEventListener( <String> type, <Function> fn, <Object> context? )
addEventListener( <Object> eventMap, <Object> context? )
removeEventListener( <String> type, <Function> fn?, <Object> context? )
removeEventListener( <Object> eventMap, <Object> context? )
removeEventListener()
hasEventListeners( <String> type )
fireEvent( <String> type, <Object> data? )
clearAllEventListeners()
on( … )
once( … )
off( … )
fire( … )
```

---

## Leaflet Utility Functions

Before reaching for underscore, check `L.Util`.

```javascript
L.Util.extend(destination, source);   // Leaflet
_.extend(destination, *sources);      // Underscore


L.Util.bind(functin, object);
_.bind(functin, object, *args);


L.Util.limitExecByInterval(functin, wait, [context]);
_.debounce(functin, wait, [immediate]);


L.Util.setOptions(object, options);
_.defaults(object, *defaults);


L.Util.template(templateString, data);
_.template(templateString, [data], [settings]);
```

---

# Three Examples

---

# Project Specific Mixin

---

```javascript
L.Util.VIPUtils = L.Util.extend({

  layerToJson: function (layer) {
    return jQuery.toJSON( layer.toGeoJSON() );
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

---

# Fixed Marker Plugin

---

```javascript
var FixedMarker = L.Class.extend({

  includes: L.Mixin.Events,

  options: {
    enabled: true,
    markerOptions: {
      opacity: 0,
      clickable: false
    },
    projectLocation: [38.906653, -77.042783]
  },
```

---

```javascript
  initialize: function (map, options) {
    L.Util.setOptions(this, options);
    this._map = map;

    // Fixed marker is a fake. Just pretends to be an actual marker
    this.$fixedMarker = $('<div/>')
            .addClass('fixed_marker')
            .appendTo(this._map.getContainer()),
    this.$fixedMarkerTooltip = $('<div/>')
            .html(lang.DragToSetLocation)
            .addClass('fixed_marker_tooltip')
            .hide()
            .appendTo(this._map.getContainer());
    this.projectLocation = this.options.projectLocation;
    this.enabled = this.options.enabled;

    this.$address = $('span.address'),
    this.$saveLocation = $('a.save_location');

    // Init values.
    this.latestGeocode = false;
    this.currentAddress = this.$address.html();

    this.marker = L.marker(
      this.projectLocation,
      this.options.markerOptions)
      .addTo(this._map);

    if (this.enabled !== undefined && this.enabled === false) {
      this._disable(false);
    } else {
      this._enable(false);
    }
  },

```

---

```javascript
  // Updates the address when the user drags the map
  // this should be abstracted out and let this plugin
  // just handle showing a fixed marker on the map
  _updateAddress: function () {
    var mapCenter = this._map.getCenter();

    this.$address.html('<img src="/images/ajax-loader.gif" style="width: 14px; height: 14px;" />');
    this.$saveLocation.hide();
    this.$fixedMarkerTooltip.hide();

    try {
      L.Util.VIPUtils.reverseGeocode(mapCenter.lat, mapCenter.lng,
      _.bind(function (resp) {
        this.latestGeocode = resp;
        this.currentAddress = L.Util.VIPUtils.parseRawReverseGeoCode(resp);

        this.$address.html(this.currentAddress);
        this.$fixedMarkerTooltip.html(lang.SaveProjectLocation).show();
        this.$saveLocation.html(lang.Save);
        this.$saveLocation.show();
        this.fireEvent('updatedaddress', { currentAddress: this.currentAddress });
      }, this));

    } catch (err) {
      this.currentAddress = lang.ErrorFetchingAddress;
      this.latestGeocode = false;
      this.$address.html(this.currentAddress);
      this.$fixedMarkerTooltip.html(lang.DragToSetLocation).show();
      this.$saveLocation.html('');
    }
  },
```

---
```javascript
  getCityState: function () {
    var location = this.latestGeocode.results[0].locations[0];
    var cityState = "";

    if (location.adminArea5 !== "") {
      cityState += location.adminArea5;
    }

    // County, doesn't seem to be necesary
    // if (location.adminArea4 !== "") {
    //  cityState += ", " + location.adminArea4;
    // }

    if (location.adminArea3 !== "") {
      cityState += ", " + location.adminArea3;
    }

    return cityState;
  },
```

---

```javascript
  // Turns plugin off.
  _disable: function (fade) {
    var fadeDuration = 400;

    if (fade === false) {
      fadeDuration = 0;
    }

    this.enabled = false;

    this.$fixedMarker.fadeOut(fadeDuration);
    this.$fixedMarkerTooltip.fadeOut(fadeDuration);
    this.$saveLocation.fadeOut(fadeDuration);

    this._eventsOff();
    this.marker.setOpacity(1.0);

    return this;
  },
```
---
```javascript
  _eventsOn: function () {
    this._map.on('dragend zoomend', this._updateAddress, this);

    // jQuery events
    this.$fixedMarkerTooltip.on('click', $.proxy(this._updateProjectLocation, this));
    this.$saveLocation.on('click', $.proxy(this._updateProjectLocation, this));

    return this;
  },

  _eventsOff: function () {
    this._map.off('dragend zoomend', this._updateAddress, this);

    // jQuery events
    this.$fixedMarkerTooltip.off('click', $.proxy(this._updateProjectLocation, this));
    this.$saveLocation.off('click', $.proxy(this._updateProjectLocation, this));

    return this;
  },
```
---
```javascript
  // Called when updating the database
  _updateProjectLocation: function (e) {
    if (this.latestGeocode === undefined || this.latestGeocode === false ) { return; }

    // If so continue and notify the user we are doing something.
    $(e.currentTarget).html('<img src="/images/ajax-loader.gif" style="width: 14px; height: 14px;" />');

    var mapCenter = this._map.getCenter();
    this.projectLocation = mapCenter;

    this._postProjectLocation(mapCenter.lat, mapCenter.lng, this.latestGeocode, this.currentAddress, slug, this._savedLocation);
  },
```
---
```javascript
  // Handles AJAX post to database
  _postProjectLocation: function (lat, lng, lastGeocode, currAddress, slug, callback) {
    $.ajax({
      type: 'POST',
      url: '/projects/update_project_location/' + slug,
      dataType: 'json',
      context: this,
      data: {
        csrf_vip: $.cookie('csrf_cookie_vip'),
        'project_lat': lat,
        'project_lng': lng,
        'project_location': currAddress,
        'project_geocode': JSON.stringify(lastGeocode)
      },
      success: callback
    });
  },
```
---
```javascript
  // Called when successfully saved a location
  _savedLocation: function (response, status, jqXHR) {
    //lat, lng, lastGeocode
    $('.save_location, .fixed_marker_tooltip').html(lang.Saved);

    // Make sure the marker has been udpated.
    this.fireEvent('savedaddress', {
      currentAddress: this.currentAddress,
      latLng: this.projectLocation,
      cityState: this.getCityState()
    });

    this.marker.setLatLng(this.projectLocation);
  },
```
---
```javascript
  _state: function () {
    return this.enabled ? true : false;
  },

  toggle: function (fade) {
    fade = fade || true;
    if (this._state() === true) {
      this._disable(fade);
    } else {
      this._enable(fade);
    }

    return this;
  }
});
```

---

# Extending Leaflet.Draw

---
```javascript

var AdvancedMapDraw = L.Class.extend({

  includes: L.Mixin.FixedMarker,

  options: {
    slug: '',
    mapData: []
  },

  initialize: function (map, options) {
    L.Util.setOptions(this, options);

    this.drawnItems = new L.featureGroup();
    this._map = map;
    this.wicketUtil = new Wkt.Wkt();
    this.slug = this.options.slug;
    this.mapData = this.options.mapData;
    this.$editLocation = $('a.edit_location');
    this.$cancelEditLocation = $('a.cancel_location');

    var myIcon = L.icon({
      iconUrl: '/images/map/marker-gray.png',
      iconSize: [26, 41]
      // Other options to consider adding in.
      // iconAnchor: [22, 94],
      // popupAnchor: [-3, -76],
      // shadowUrl: 'my-icon-shadow.png',
      // shadowRetinaUrl: 'my-icon-shadow@2x.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
      });

    this.fm = new FixedMarker(map, {
      projectLocation: mapCoords,
      enabled: false
    });

    // We create the edit this project location popup for the fixed marker.
    // This should be rolled into the FixedMarker class and turned into a function
    this.popup = L.popup({
      closeButton: false,
      closeOnClick: false
    }).setContent('<a class="toggleEdit">' + lang.EditProjectLocation + '</a>');

    this.fm.marker.bindPopup(this.popup).openPopup();

    // Init our our drawing thingy
    this.drawControl = new L.Control.Draw({
      draw: {
        position: 'topleft',
        polygon: {
        //  title: 'Draw a sexy polygon!',
          allowIntersection: true,
          drawError: {
            color: '#b00b00',
            timeout: 1000
          },
          shapeOptions: {
            color: '#0033ff'
          },
          showArea: true
        },
        polyline: {
          metric: false,
          shapeOptions: {
            color: '#0033ff'
          },
        },
        circle: false,
        rectangle: {
          shapeOptions: {
            color: '#0033ff'
          },
        },
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });
    this._map.addControl(this.drawControl);

    this.drawnItems.addTo(this._map);

    /* When I created this last check it seemed logical but now it isn't
     * Ima leave it here in case it does come in handy.
     *
    // Create some polygons from database data and enable events
    if (this.mapData instanceof Array && this.mapData.length > 0) {
      this.addItemsToMap(this.mapData)._eventsOn();
    } else {
      // bail out
      this.drawControl.removeFrom(this._map);
      this._map.closePopup();
      this.$editLocation.remove();
    }
    */
    this.addItemsToMap(this.mapData)._eventsOn();
  },

  // Handles switching between the two modes
  _togglProjectEdit: function (e) {
    if (this.fm._state() === false) {
      this._map.panTo(this.fm.marker.getLatLng());
      this.fm.marker.closePopup();
      this.$editLocation.hide();
      this.$cancelEditLocation.show();
    } else {
      this.fm.marker.openPopup();
      this.$editLocation.show();
      this.$cancelEditLocation.hide();
    }

    this.fm.toggle(false);

    return this;
  },

  // Loads initial dataset from map_geom
  addItemsToMap: function (data) {
    for (var i = 0; i < data.length; i++) {
      try { // Catch any malformed WKT strings
        this.wicketUtil.read(JSON.stringify(data[i].geom));
        var obj = this.wicketUtil.toObject(this._map.defaults);
        obj.dataId = data[i].id;
        this.drawnItems.addLayer( obj );
      } catch (e) {
        // Don't throw an exception here as it will break out of the loop. Just supress
        // the problem and move along.
        // throw new Error('Wicket could not understand the WKT string you entered.');
      }
    };

    return this;
  },

  /**
   * Prepares data for being posted, throws errors if unhappy.
   * @param  {[type]} action Can be the creation or editing of a polygon
   * @param  {[type]} layer  A single layer
   * @return {[type]}        Nothing at the momement
   */
  preparePostData: function (action, layer) {
    var dataId = null;

    if (L.LayerGroup.prototype.isPrototypeOf(layer)) {
      throw new Error("preparePostData cannot handle layerGroups");
    }

    try {
      this.wicketUtil.fromObject( layer );
    } catch (e) {
      throw new Error("Could not parse the layer data");
    }

    if (layer.hasOwnProperty('dataId') && layer.dataId !== null) {
      dataId = layer.dataId;
    }

    var post_data = {
      id: dataId,
      action: action,
      data: {
        geojson: jQuery.toJSON( layer.toGeoJSON() ),
        geom: this.wicketUtil.write()
      }
    }

    return post_data;
  },

  postProjectDrawdata: function (slug, data) {
    return $.ajax({
        type: 'POST',
        url: '/projects/update_map_draw/' + slug,
        dataType: 'html',
        data: data,
        context: this
      });
  },

  _handleLayerCreated: function (e) {
    var layer = e.layer;
    this.drawnItems.addLayer(layer);

    try {
      var post_data = this.preparePostData('update', layer);
      this.postProjectDrawdata(this.slug, post_data)
          .done(function (resp) {
            layer.dataId = JSON.parse(resp).gid;
          });
    } catch (e) {
      /*
        Need to handle user feedback for errors here.
       */
    }
  },

  _handleLayerEdited: function (e) {
    e.layers.eachLayer(function (layer) {
      try {
        var post_data = this.preparePostData('update', layer);
        this.postProjectDrawdata(this.slug, post_data).done(function (resp) {
          // do nothing;
        });
      } catch (e) {
        /*
          Need to handle user feedback for errors here.
         */
      }
    }, this);
  },

  _handleLayerDeleted: function (e) {
    e.layers.eachLayer(function (layer) {
      try {
        if (layer.dataId !== null) {
          var post_data = this.preparePostData('delete', layer);
          this.postProjectDrawdata(this.slug, post_data).done(function (resp) {
            // do nothing
          });
        }
      } catch (e) {
        /*
          Need to handle user feedback for errors here.
         */
      }
    }, this);
  },

  _eventsOn: function () {
    // leaflet events
    this._map.on('draw:created', this._handleLayerCreated, this);
    this._map.on('draw:edited', this._handleLayerEdited, this);
    this._map.on('draw:deleted', this._handleLayerDeleted, this);
    this.fm.on('savedaddress', this._togglProjectEdit, this);

    // jQuery events
    $('.map_box').on('click', '.toggleEdit', $.proxy(this._togglProjectEdit, this));
  },

  _eventsOff: function () {
    // leaflet events
    this._map.off('draw:created', this._handleLayerCreated, this);
    this._map.off('draw:edited', this._handleLayerEdited, this);
    this._map.off('draw:deleted', this._handleLayerDeleted, this);

    // jQuery events
    $('.map_box').off('click', '.toggleEdit', $.proxy(this._togglProjectEdit, this));
  }
});
```

---

# Advanced Topics
Quick Backbone.js & Leaflet.js demo
