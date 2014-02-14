var map;

$(document).ready(function() {
    $('[rel=tooltip]').tooltip();
    if (document.body.clientWidth <= 767) {
        $('#sidebar').toggle();
        $('a.toggle i').toggleClass('icon-chevron-left icon-chevron-right');
    }
});
$(window).resize(function() {
    $('.tt-dropdown-menu').css('max-height', $('#container').height()-$('.navbar').height()-20);
});

$('a.toggle').click(function() {
    $('a.toggle i').toggleClass('icon-chevron-left icon-chevron-right');
    $('#map').toggleClass('col-sm-9 col-lg-9 col-sm-12 col-lg-12');
    $('#sidebar').toggle();
    map.invalidateSize();
    return false;
});


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

// Basemap Layers
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["otile1", "otile2", "otile3", "otile4"],
    attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
    maxZoom: 18,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
    attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
    maxZoom: 18,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
    attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

// Overlay Layers



var hikes = L.geoJson(null, {
    
    pointToLayer: function (feature, latlng) {
	            return L.marker(latlng, {
	                title: feature.properties.Date
	            });
	        },
	onEachFeature: function (feature, layer) {
		        layer.bindPopup("<p><b>Date: </b></p>" + feature.properties.Date + "<p><b>Location: </b></p>" + 
        feature.properties.Location + "<p><b>Terrain: </b></p>" + feature.properties.Terrain + 
        "<p><b>Difficulty: </b></p>" + feature.properties.Difficulty,
        {maxWidth: 300, minWidth: 100, maxHeight: 160, closeButton: true, showOnMouseOver: true});
		        
    }
});


$.getJSON("data/hikes.geojson", function (data) {
    hikes.addData(data);
});

console.log(hikes);  // not a proper object.  this is why the features array doesn't turn up with anything.

var features = [];
		hikes.eachLayer(function (layer) {
		    var id = layer._leaflet_id;
			var name = layer.feature.properties.Date;
			var coords = layer.feature.geometry.coordinates;
			var lng = layer.feature.geometry.coordinates[0];
			var lat = layer.feature.geometry.coordinates[1];
			
			features.push({id: id, label: name, value: name, lat: lat, lng: lng});
			
			// Populate features array and build autocomplete
		
			console.log(features);
			// Populate sidebar table with clickable feature links
			$(".list-group ul").append('<li><a href="#" onclick="map._layers['+id+'].openPopup(); return false;">'+date+'</a></li>');
			// Add features to zoom dropdown
		});

console.log(features);  // comes up totally blank


map = L.map("map", {
    zoom: 9,
    center: new L.LatLng(17.059417, -96.721622),
    layers: [mapquestOSM,hikes] //[mapquestOSM, boroughs, subwayLines, churchs]
});
// Hack to preserver layer order in Layer control
//map.removeLayer(subwayLines);

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
    "Streets": mapquestOSM,
    "Imagery": mapquestOAM,
    "Hybrid": mapquestHYB
};

var overlays = {
    "hikes": hikes,
};

// var layerControl = L.control.layers(baseLayers, overlays, {
//     collapsed: isCollapsed
// }).addTo(map);

// Highlight search box text on click

// Placeholder hack for IE
if (navigator.appName == "Microsoft Internet Explorer") {
    $("input").each( function () {
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


