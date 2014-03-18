var map;

$(document).ready(function () {
    $('[rel=tooltip]').tooltip();
    if (document.body.clientWidth <= 767) {
        $('#sidebar').toggle();
        $('a.toggle i').toggleClass('icon-chevron-left icon-chevron-right');
    }
});
$(window).resize(function () {
    $('.tt-dropdown-menu').css('max-height', $('#container').height() - $('.navbar').height() - 20);
});
$('a.toggle').click(function () {
    $('a.toggle i').toggleClass('icon-chevron-left icon-chevron-right');
    $('#map').toggleClass('col-sm-9 col-lg-9 col-sm-12 col-lg-12');
    $('#sidebar').toggle();
    map.invalidateSize();
    return false;
});

var tiles = L.tileLayer("http://b.tile.cloudmade.com/427d7a7244db4c62b51b1ee252996cc0/1714/256/{z}/{x}/{y}.png", {
    maxZoom: 17,
    subdomains: ["otile1", "otile2", "otile3", "otile4"],
    attribution: 'Tiles by CloudMade.'
});




//http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png

// map icons
var hike_icon = L.icon({
    iconUrl: 'img/hiker.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var ngo_icon = L.icon({
    iconUrl: 'img/ngo.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var mezcal_icon = L.icon({
    iconUrl: 'img/agaveicon.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var yoga_icon = L.icon({
    iconUrl: 'img/yoga.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var pueblos_icon = L.icon({
    iconUrl: 'img/pueblos.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var cafe_icon = L.icon({
    iconUrl: 'img/coffee.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
var market_icon = L.icon({
    iconUrl: 'img/market.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});


var hikes = L.geoJson(null, {
    
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: hike_icon

        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Location: </b>" + feature.properties.Location + "</br>" + "<b>Terrain: </b>" + feature.properties.Terrain + "</br>" +
            "<b>Difficulty: </b>" + feature.properties.Difficulty + "</br>" + '<a target="_blank" href="' + feature.properties.url + '">' + 'More Info</a>', {
            maxWidth: 500,
            minWidth: 100,
            maxHeight: 260,
            closeButton: true
        });
        

        var id = layer._leaflet_id;
        var name = layer.feature.properties.Date;
        var coords = layer.feature.geometry.coordinates;
        var location = layer.feature.properties.Location;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];


        // Append clickable list to sidebar
        //	$("#list-group-container").append('<button class="list-group-item><a href="#" onclick="map._layers['+id+'].openPopup(); return false;">'+location+'</a></button>');

        $("#collapseTwo").append('<div><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + location + '</a></div>');

    }
});

$.getJSON("data/hikes.geojson", function (data) {
    hikes.addData(data);
});

var ngos = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return new L.marker(latlng, {
            icon: ngo_icon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Organization: </b>" + feature.properties.Organization + "</br>" + "<b>Type: </b>" + feature.properties.Type + "</br>" +
            "<b>What they do: </b>" + feature.properties.What_they_do + "</br>" + '<a target="_blank" href="' + feature.properties.Website + '">' + 'More Info</a>', {
            maxWidth: 250,
            minWidth: 100,
            closeButton: true,
            showOnMouseOver: true
        });

        /*
        "Organization": "Hijos de la Luna",
        "Type": "Working with Children",
        "Website": "http://www.hijosdelaluna-en.org/",
        "What_they_do": "is a children's home that takes care of over 50 children"
        */

        var id = layer._leaflet_id;
        var Organization = layer.feature.properties.Organization;
        var Type = layer.feature.geometry.Type;
        var What_they_do = layer.feature.properties.What_they_do;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];


        // Append clickable list to sidebar
       // $("#listy").append('<div><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + Organization + '</a></div>');

    }
});

$.getJSON("data/ngos.geojson", function (data) {
    ngos.addData(data);
});

var mezcal = L.geoJson(null, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: mezcal_icon
            //title: feature.properties.Date
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name + "</br>" + '<a target="_blank" href="' + feature.properties.Website + '">' + 'More Info</a>', {
            maxWidth: 500,
            minWidth: 100,
            maxHeight: 260,
            closeButton: true,
            showOnMouseOver: true
        });


        /* var o = '<a target="_blank" href="' + feature.properties.url + '">' +
            '<img src="' + feature.properties.image + '">' +
            '<h2>' + feature.properties.city + '</h2>' +
            '</a>';
        */


        var id = layer._leaflet_id;
        var name = layer.feature.properties.Name;
        var coords = layer.feature.geometry.coordinates;
        var Website = layer.feature.properties.Website;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];


        // Append clickable list to sidebar
        $("#list-group-container").append('<button class="list-group-item><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + name + '</a></button>');

    }
});

$.getJSON("data/mezcal.geojson", function (data) {
    mezcal.addData(data);
});

var yoga = L.geoJson(null, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: yoga_icon
            //title: feature.properties.Date
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Name: </b>" + feature.properties.Name + "</br>" + '<a target="_blank" href="' + feature.properties.url + '">' + 'More Info</a>', {
            maxWidth: 500,
            minWidth: 100,
            maxHeight: 260,
            closeButton: true,
            showOnMouseOver: true
        });


        /* var o = '<a target="_blank" href="' + feature.properties.url + '">' +
            '<img src="' + feature.properties.image + '">' +
            '<h2>' + feature.properties.city + '</h2>' +
            '</a>';
        */


        var id = layer._leaflet_id;
        var name = layer.feature.properties.Name;
        var coords = layer.feature.geometry.coordinates;
        var location = layer.feature.properties.Location;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];


        // Append clickable list to sidebar
        // $("#listy").append('<div class="listish"><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + name + '</a></div>');

    }
});

$.getJSON("data/yoga.geojson", function (data) {
    yoga.addData(data);
});

var pueblos = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: pueblos_icon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Place: </b>" + feature.properties.location + "</br>" + "<b>What to see: </b>" + feature.properties.what + "</br>" + '<a target="_blank" href="' + feature.properties.url + '">' + 'More Info</a>', {
            maxWidth: 500,
            minWidth: 100,
            maxHeight: 260,
            closeButton: true,
            showOnMouseOver: true
        });
        
       //console.log(layer);

        var id = layer._leaflet_id;
        var location = layer.feature.properties.location;
        var what = layer.feature.geometry.what;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];
        

        // Append clickable list to sidebar
        $("#listy").append('<div class="listy-item"><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + location + '</a></div>');
    }
});

$.getJSON("data/pueblos.geojson", function (data) {
    pueblos.addData(data);
});


var cafes = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: cafe_icon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name, {
            maxWidth: 500,
            minWidth: 50,
            maxHeight: 260,
            closeButton: true,
            showOnMouseOver: true
        });
        
       //console.log(layer);

        var id = layer._leaflet_id;
        var Name = layer.feature.properties.Name;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];
        

        // Append clickable list to sidebar
        $("#listy").append('<div class="listy-item"><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + Name + '</a></div>');
    }
});

$.getJSON("data/cafes.geojson", function (data) {
    cafes.addData(data);
});

var markets = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: market_icon
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Market: </b>" + feature.properties.Name + "</br>" + "<b>Open: </b>" + feature.properties.Open + "</br>" + '<a target="_blank" href="' + feature.properties.url + '">' + 'More Info</a>', {
            maxWidth: 500,
            minWidth: 100,
            maxHeight: 260,
            closeButton: true,
            showOnMouseOver: true
        });
        
       //console.log(layer);

        var id = layer._leaflet_id;
        var Name = layer.feature.properties.Name;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];
        

        // Append clickable list to sidebar
        $("#listy").append('<div class="listy-item"><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + Name + '</a></div>');
    }
});

$.getJSON("data/markets.geojson", function (data) {
    markets.addData(data);
});

map = L.map("map", {
    zoom: 15,
    center: new L.LatLng(17.0669428,-96.7229346),
    layers: [tiles, hikes, ngos, mezcal, yoga],
    zoomControl: false
});

new L.Control.Zoom({ position: 'topright' }).addTo(map);

// Layer Controls

var ui = document.getElementById('layer-ui');

addLayer(pueblos, 'Day trips', 1);
addLayer(ngos, 'NGOs', 2);
addLayer(yoga, 'Yoga', 3);
addLayer(mezcal, 'Mezcalerias', 4);
addLayer(hikes, 'Hikes', 5);
addLayer(cafes, 'Cafés', 6);
addLayer(markets, 'Markets', 7);


function addLayer(layer, name, zIndex) {
    layer
    //.setZIndex(zIndex)
    .addTo(map);
    
    
    //layer.on('click', function(d) {
    //console.log(this._leaflet_id);
        
    //});

    // Layer toggler
    var item = document.createElement('li');
    var link = document.createElement('a');
    
    //link.href = '#';
    link.className = 'active';
    link.innerHTML = name;

    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
        
    }

    item.appendChild(link);
    ui.appendChild(item);
}


var scaleControl = L.control.scale({
    position: 'bottomright'
});

// Larger screens get scale control and expanded layer control
if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
    map.addControl(scaleControl);
};

var baseLayers = {
    "Streets": tiles
};

var overlays = {
    "hikes": hikes,
    "ngos": ngos,
};

// Placeholder hack for IE
if (navigator.appName == "Microsoft Internet Explorer") {
    $("input").each(function () {
        if ($(this).val() == "" && $(this).attr("placeholder") != "") {
            $(this).val($(this).attr("placeholder"));
            $(this).focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            });
            $(this).blur(function () {
                if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
            });
        }
    });
}



// GEO

var geolocate = document.getElementById('geolocate');


if (!navigator.geolocation) {
    geolocate.innerHTML = 'geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);
    
    
    
    
    //L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
    
    new L.marker(e.latlng).addTo(map) // works
    
    /*
    new L.marker({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'marker-color': '#DB3156',
            'marker-symbol': 'embassy'
        }
    }).addto(map); */
    //here.addto(map);
 });

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = '&#x274C;';
});

    var tooltip = this.callbacks._currentTooltip;
if (tooltip){

  // Default offset is bottom right
  var offsetX = 20;
  var offsetY = 20;

  // Check if horizontal space
  if ((pos.x + tooltip.offsetWidth + offsetX + 5) > this.map.size.w) {
    offsetX = -tooltip.offsetWidth - 5;
  }

  // Check if vertical space
  if ((pos.y + tooltip.offsetHeight + offsetY + 5) > this.map.size.h) {
    offsetY = -35;
  }

  tooltip.style.left = pos.x + offsetX + 'px';
  tooltip.style.top = pos.y + offsetY + 'px';
}