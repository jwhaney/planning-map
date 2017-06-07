//create var bounds
var northWest = L.latLng(30.95, -99.49),
	southEast = L.latLng(29.72, -96.66),
	bounds = L.latLngBounds(northWest, southEast);

//create map
var map = L.map('map');

//fit map to bounds
map.fitBounds(bounds);

//load custom txdot basemap as initial base
var spm = L.esri.tiledMapLayer({
                url: 'https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Statewide_Planning_Map/MapServer'
            }).addTo(map);

//openstreetmap variable
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//carto basemap variable
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://carto.com/attribution">Carto</a>'
    });

var darkmatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://carto.com/attribution">Carto</a>'
    });

//esri basemap variables
var topo = L.esri.basemapLayer("Topographic");
var imagery = L.esri.basemapLayer("Imagery", "ImageryTransportation");

//custom easy button control, zoom to var bounds
L.easyButton('fa-globe fa-lg', function(){
    map.fitBounds(bounds)
}).addTo(map);

//esri leaflet geocoder control
var searchControl = L.esri.Geocoding.geosearch().addTo(map);
var results = L.layerGroup().addTo(map);

//load AUS district boundary AGO feature service
var ausHilite = L.esri.featureLayer({
				url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Austin_Hilite_TxGeneral_Boundary/FeatureServer/0',
				style: function(feature) {
					return {color: '#000000', fillOpacity: 0.4};
					}
				}).addTo(map);

//create AUS TxDOT projects layer - filter for AUS & create Project Tracker symbology
var ausProjects = L.esri.featureLayer({
                    url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Projects/FeatureServer/0',
                    where: "DISTRICT_NAME = 'Austin'",
                    style: function (feature) {
                        if(feature.properties.PRJ_STATUS === 'Construction Scheduled'){
                            return {color: '#d7191c', weight: 4};
                        }   else if(feature.properties.PRJ_STATUS === 'Finalizing for Construction'){
                            return {color: '#fdae61', weight: 4};
                        }   else if(feature.properties.PRJ_STATUS === 'Under Development'){
                            return {color: '#80cdc1', weight: 4};
                        }   else if(feature.properties.PRJ_STATUS === 'Long Term Planning'){
                            return {color: '#2c7bb6', weight: 4};
                        }   else {
                            return {color: '#aaaaaa', weight: 4};
                        }
                      }
                    });

//popup for ausProjects
ausProjects.bindPopup(function (evt) {
	return L.Util.template('<b>CSJ: </b>{CONTROL_SECT_JOB}<br><b>HWY: </b>{HIGHWAY_NUMBER}<br><b>COUNTY: </b>{COUNTY_NAME}<br><b>LENGTH: </b>{PROJ_LENGTH}<br><b>PROJECT CLASS: </b>{PROJ_CLASS}<br><b>EST. COST: </b>{EST_CONST_COST}<br><b>TYPE OF WORK: </b>{TYPE_OF_WORK}<br><b>LET DATE: </b>{DIST_LET_DATE}<br><b>BEGIN MILE PT: </b>{BEG_MILE_POINT}<br><b>END MILE PT: </b>{END_MILE_POINT}<br><b>FUND CATEGORY: </b>{TPP_CATEGORY_P2}<br><b>WORK PROGRAM: </b>{TPP_WORK_PROGRAM}<br><b>STATUS: </b>{PRJ_STATUS}',
	evt.feature.properties);
});

//aadt variable as marker cluster
var aadt = L.esri.Cluster.featureLayer({
    url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_AADT/FeatureServer/0',
	where: "T_DIST_NBR = 14",
	pointToLayer: function (geojson, latlng) {
		return L.marker(latlng, {
			icon: redCircle
		});
	},
});

//red circle marker for aadt
var redCircle = L.icon({
	iconUrl: 'style/images/redCircle.png',
	iconSize: [12, 12]
});

//popup for aadt
aadt.bindPopup(function (evt) {
	return L.Util.template('<b>2015 COUNT: </b>{F2015_TRAF}<br><b>2014 COUNT: </b>{F2014_TRAF}<br><b>2013 COUNT: </b>{F2013_TRAF}<br><b>2012 COUNT: </b>{F2012_TRAF}',
	evt.feature.properties);
});

//create top 100 most congested rdwys variable
var mostCongested = L.esri.featureLayer({
	url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/ArcGIS/rest/services/TxDOT_Top_100_Congested_Roadways/FeatureServer/0',
	where: "DIST_NM = 'Austin'",
	style: function (feature) {
		return {color: '#d7211a', weight: 4};
	}
});

//popup for top 100
mostCongested.bindPopup(function (evt) {
	return L.Util.template('<b>HWY: </b>{RD_NM}<br><b>YEAR: </b>{YR}<br><b>RANK: </b>{RANK}<br><b>DELAY COST: </b>{COST_DLAY}',
	evt.feature.properties);
});

//create county layer for aus
var ausCounty = L.esri.featureLayer({
	url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/ArcGIS/rest/services/Texas_County_Boundaries/FeatureServer/0',
	where: "DIST_NM = 'Austin'",
	style: function (feature) {
		return {color: '#000', weight: 2, fillOpacity: 0};
	}
});

//county layer labels
var labels = {};

ausCounty.on('createfeature', function(e){
    var id = e.feature.id;
    var feature = ausCounty.getFeature(id);
    var center = feature.getBounds().getCenter();
    var label = L.marker(center, {
      icon: L.divIcon({
        iconSize: null,
        className: 'label',
        html: '<div>' + e.feature.properties.CNTY_NM + '</div>'
      })
    }).addTo(map);
    labels[id] = label;
  });

  ausCounty.on('addfeature', function(e){
    var label = labels[e.feature.id];
    if(label){
      label.addTo(map);
    }
  });

  ausCounty.on('removefeature', function(e){
    var label = labels[e.feature.id];
    if(label){
      map.removeLayer(label);
    }
  });

//basemap layer control
var baseMaps = {
	"TxDOT SPM": spm,
	"OpenStreetMap": osm,
	"Positron": positron,
	"Dark Matter": darkmatter,
	"Topographic": topo,
	"ESRI Imagery": imagery
};

L.control.layers(baseMaps).addTo(map);

//jquery for interactive table of contents - custom layer control
function plusOne(){
	$('#arrow').css({transform:'scaleX(1)'});
}

function minusOne(){
	$('#arrow').css({transform:'scaleX(-1)'});
}

function toggleLayer(checked, layer) {
	if (checked) {
		map.addLayer(layer);
	}else {
		map.removeLayer(layer);
	}
}

$(document).ready(function(){
//	$('#toc').draggable();
	$('#arrow').click(function(){
		if($('#toc').css('width')=='33px'){
			$('#toc').animate({width:'185px', height:'250px'}, 500, minusOne);
			$('#layer-control').show();
			$('#horz').show();
			$('#vert').hide();
		}else{
			$('#toc').animate({width:'33px', height:'175px'}, 500, plusOne);
			$('#layer-control').hide();
			$('#horz').hide();
			$('#vert').show();
		}
	});

	$(".check").change(function() {
		var layerClicked = $(this).attr("id");
			switch (layerClicked) {
    		case "ausHilite":
      			toggleLayer(this.checked, ausHilite);
      		break;
    		case "ausProjects":
      			toggleLayer(this.checked, ausProjects);
      		break;
			case "aadt":
				toggleLayer(this.checked, aadt);
			break;
			case "mostCongested":
				toggleLayer(this.checked, mostCongested);
			break;
			case "ausCounty":
				toggleLayer(this.checked, ausCounty);
			break;
			}
	});
	
});
