var map = L.map('map', {zoomControl: false}).setView([30.417, -98.120], 9);

var layer = L.esri.tiledMapLayer({
                url: 'https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Statewide_Planning_Map/MapServer'
            }).addTo(map);

var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(map);

var searchControl = L.esri.Geocoding.geosearch().addTo(map);

var results = L.layerGroup().addTo(map);

searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

function setBasemap(basemap) {
    if (layer) {
      map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);

    map.addLayer(layer);

    if (layerLabels) {
      map.removeLayer(layerLabels);
    }

    if (basemap === 'Topographic'
     || basemap === 'Streets'
     || basemap === 'NationalGeographic'
     || basemap === 'Terrain'
     || basemap === 'Gray'
     || basemap === 'DarkGray'
     || basemap === 'USATopo'
     || basemap === 'Imagery'
     || basemap === 'ShadedRelief'
   ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    }
  }

function changeBasemap(basemaps){
    var basemap = basemaps.value;
    setBasemap(basemap);
  }
  
//load AUS district boundary AGO service
L.esri.featureLayer({
    url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/AUS_District_Boundary_Ln/FeatureServer/0',
    style: function (feature) {
        return {color: '#000000', weight: 3};
    }
  }).addTo(map);

var layerLabels;

var ausProjects = L.esri.featureLayer({
                    url: 'https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Projects/FeatureServer/0',
                    where: "DISTRICT_NAME = 'Austin'",
                    style: function (feature) {
                        if(feature.properties.PRJ_STATUS === 'Construction Scheduled'){
                            return {color: '#d7191c', weight: 3};
                        }   else if(feature.properties.PRJ_STATUS === 'Finalizing for Construction'){
                            return {color: '#fdae61', weight: 3};
                        }   else if(feature.properties.PRJ_STATUS === 'Under Development'){
                            return {color: '#80cdc1', weight: 3};
                        }   else if(feature.properties.PRJ_STATUS === 'Long Term Planning'){
                            return {color: '#2c7bb6', weight: 3};
                        }   else {
                            return {color: '#aaaaaa', weight: 3};
                        }
                      }
                    }).addTo(map);

ausProjects.bindPopup(function (evt) {
    return L.Util.template('<p><b>HWY: </b>{HIGHWAY_NUMBER}<br><b>CSJ: </b>{CONTROL_SECT_JOB}</p>', evt.feature.properties);
})

var county = document.getElementById('county');

county.addEventListener('change', function(){
    stops.setWhere(county.value);
});