// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 8);

// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Conjunto de capas base
var capas_base = {
  "OSM": capa_osm
};	    
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de ASP en formato GeoJSON
$.getJSON("https://tpb729-desarrollosigweb-2021.github.io/datos/sinac/areas_protegidas-wgs84.geojson", function(geodata) {
  var capa_asp = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Área protegida</strong>: " + feature.properties.nombre_asp + "<br>" + "<strong>Categoría</strong>: " + feature.properties.cat_manejo;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_asp, 'Áreas protegidas');
});	

// Capa raster de temperatura media anual
var capa_temperatura = L.imageOverlay("https://raw.githubusercontent.com/tpb729-desarrollosigweb-2021/datos/main/worldclim/bio1_cr.png", 
	[[11.2174518619451575, -87.0981414346102696], 
	[5.4997120253547189, -82.5543713734725770]], 
	{opacity:0.5}
).addTo(mapa);
control_capas.addOverlay(capa_temperatura, 'Temperatura');

// Capa raster de precipitacion anual
var capa_precipitacion = L.imageOverlay("https://raw.githubusercontent.com/tpb729-desarrollosigweb-2021/datos/main/worldclim/bio12_cr.png", 
	[[11.2186629710523480, -87.0977137854603995], 
	[5.5032827060751659, -82.5553380850013383]], 
	{opacity:1.0}
).addTo(mapa);
control_capas.addOverlay(capa_precipitacion, 'Precipitación');

function updateOpacity() {
  document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
  capa_temperatura.setOpacity(document.getElementById("sld-opacity").value);
}
