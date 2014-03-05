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

/*
$('input[name="basemapLayers"]').change(function () {
    // Remove unchecked layers
    $('input:radio[name="basemapLayers"]:not(:checked)').each(function () {
        map.removeLayer(window[$(this).attr('id')]);
    });
    // Add checked layer
    $('input:radio[name="basemapLayers"]:checked').each(function () {
        map.addLayer(window[$(this).attr('id')]);
    });
}); 



$('input:checkbox[name="overlayLayers"]').change(function () {
    var layers = [];
    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    if ($('#' + $(this).attr('id')).is(':checked')) {
        $('input:checkbox[name="overlayLayers"]').each(function () {
            // Remove all overlay layers
            map.removeLayer(window[$(this).attr('id')]);
            if ($('#' + $(this).attr('id')).is(':checked')) {
                // Add checked layers to array for sorting
                layers.push({
                    'z-index': $(this).attr('z-index'),
                    'layer': $(this)
                });
            }
        });
        // Sort layers array by z-index
        var orderedLayers = sortByKey(layers, 'z-index');
        // Loop through ordered layers array and add to map in correct order
        $.each(orderedLayers, function () {
            map.addLayer(window[$(this)[0].layer[0].id]);
        });
    } else {
        // Simply remove unchecked layers
        map.removeLayer(window[$(this).attr('id')]);
    }
});
*/

// Basemap Layer
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["otile1", "otile2", "otile3", "otile4"],
    attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});




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
            closeButton: true,
            showOnMouseOver: true
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

/*
 pointToLayer: function (feature, latLng) {
          return new L.Marker(latLng, {
            icon: new BaseIcon({
              iconUrl: "img/library-" + feature.properties.plan + ".png"
            })
          })
          */

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
        $("#listy").append('<div><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + Organization + '</a></div>');

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
        $("#list-group-container").append('<button class="list-group-item><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + name + '</a></button>');

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

        var id = layer._leaflet_id;
        var location = layer.feature.properties.location;
        var what = layer.feature.geometry.what;
        var lng = layer.feature.geometry.coordinates[0];
        var lat = layer.feature.geometry.coordinates[1];


        // Append clickable list to sidebar
        $("#list-group-container").append('<button class="list-group-item><a href="#" onclick="map._layers[' + id + '].openPopup(); return false;">' + location + '</a></button>');

    }
});

$.getJSON("data/pueblos.geojson", function (data) {
    pueblos.addData(data);
});





map = L.map("map", {
    zoom: 12,
    center: new L.LatLng(17.059417, -96.721622),
    layers: [mapquestOSM, hikes, ngos, mezcal, yoga] //[mapquestOSM, boroughs, subwayLines, churchs]
});


// experiment





var ui = document.getElementById('layer-ui');

/*

// addLayer(L.mapbox.tileLayer('smartchicagocollaborative.fz60qkt9'), '1900-1949', 2);
  */


// Experimenting using new icons

var pueblos_icon2 = 'img/pueblos.png';
var hike_icon2 = 'img/hiker.png';
var ngo_icon2 = 'img/ngo.png';
var mezcal_icon2 = 'img/agaveicon.png'
var yoga_icon2 = 'img/yoga.png';

addLayer(pueblos, 'Pueblos', 1, pueblos_icon2);
addLayer(ngos, 'NGOs', 1, ngo_icon2);
addLayer(yoga, 'Yoga', 1, yoga_icon2);
addLayer(mezcal, 'Mezcalerias', 1, mezcal_icon2);
addLayer(hikes, 'Hikes', 1, hike_icon2);

function addLayer(layer, name, zIndex, image) {
    layer
    //.setZIndex(zIndex)
    .addTo(map);

    // Layer toggler
    var item = document.createElement('li');
    var link = document.createElement('a');
    //$(item).append('<img src="' + image + '"/>');




    // '<img id="theImg" src="img/agaveicon.png" height="28" width="24" />'

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
    };

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
    "Streets": mapquestOSM
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