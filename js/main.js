// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [58.612591, 25.665841],
	zoom: 8
});

//adding Three base maps 
var Hiking = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	attribution: 'Hiking'}).addTo(map);
var Hillshading = L.tileLayer('http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
	attribution: 'Hillshading'}).addTo(map);
var Watercolor = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
	attribution: 'Watercolor'}).addTo(map);
var Humanitarian = L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	attribution: 'Humanitarian'}).addTo(map);	
	
	
// for using the base maps in the layer control, I defined a baseMaps variable
// the text on the left is the label shown in the layer control; the text right is the variable name
var baseMaps = {
	"Hike & bike": Hiking,
	"Hillshading": Hillshading,
	"Watercolor": Watercolor,
	"Humanitarian": Humanitarian
	}


//Adding a scale bar
L.control.betterscale().addTo(map);

//adding marathon tracks
//Tamsalu-Neeruti marathon track with multicolor polyline based on elevation values
var tamsalu = L.multiOptionsPolyline(tampoint, {
    multiOptions: {
        optionIdxFn: function (latLng) {
            var i,
                altThresholds = [100, 107, 114, 121, 128, 135, 142, 149, 156];

            for (i = 0; i < altThresholds.length; ++i) {
                if (latLng.alt <= altThresholds[i]) {
                    return i;
                }
            }
            return altThresholds.length;
        },
        options: [
            {color: '#0000FF'}, {color: '#0040FF'}, {color: '#0080FF'},
            {color: '#00FFB0'}, {color: '#00E000'}, {color: '#80FF00'},
            {color: '#FFFF00'}, {color: '#FFC000'}, {color: '#FF0000'}
        ]
    },
    weight: 4,
    lineCap: 'butt',
    opacity: 0.75,
    smoothFactor: 1}).addTo(map);
	
//adding tartu marathon
var trackStyle = {
    color: "#00008b",
    weight: 4
	}

var tartu = L.geoJson(tartu, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("63 km")}
	});

tartu.addTo(map);

//adding tallinn marathon
var trackStyle = {
    color: "#800080",
    weight: 4
	}

var tallinn = L.geoJson(tallinn, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("38 km")}
	});

tallinn.addTo(map);

//adding alutaguse marathon
var trackStyle = {
    color: "#013220",
    weight: 4
	}

var alutaguse = L.geoJson(alutaguse, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("44 km")}
	});

alutaguse.addTo(map);

//adding Haanja marathon
var trackStyle = {
    color: "#FFFF00",
    weight: 4
	}

var haan = L.geoJson(haan, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup("42 km")}
	});

haan.addTo(map);

//adding geolocator
map.addControl(L.control.locate({
	strings: {
        title: "Locate me!"
    },
       locateOptions: {
               maxZoom: 9,

}}));

//adding line measurement tool
L.control.polylineMeasure().addTo(map);


	
//adding markers
//Tamsalu marker

var myIcon = L.icon({
iconUrl: 'css/images/tamsalu.png',
iconSize: [35, 35]
});

var tam = L.marker([59.24, 26.23], {icon: myIcon, title:'Tamsalu-Neeruti marathon'}).addTo(map);
tam.bindPopup("<p><u>Tamsalu-Neeruti marathon men's standings in 2019</u><br /><b>1. Kauri Kõiv </b> <br />2. Morten Sätha<br />3. Sander Linnus<br /> <a href='https://www.estoloppet.ee/et/etapid?competition_id=331'>Register here</a><br/>").addTo(map);

//Tallinn marathon
var myIcon2 = L.icon({
iconUrl: 'css/images/tallinn.png',
iconSize: [35, 35]
});

var tam = L.marker([59.33, 25.78], {icon: myIcon2, title:'TALLINN SKI MARATHON'}).addTo(map);
tam.bindPopup("<p><u>Tallinn marathon men's standings in 2019</u><br /><b>1. Henri Roos </b> <br />2. Karl Erik Rabakukk<br />3. Juri Širokov<br /> <a href='https://www.estoloppet.ee/en/etapid?competition_id=328'>Register here</a><br/>").addTo(map);

//Alutaguse maraton
var myIcon3 = L.icon({
iconUrl: 'css/images/alutaguse.png',
iconSize: [35, 35]
});

var tam = L.marker([59.28, 27.71], {icon: myIcon3, title:'Alutaguse marathon'}).addTo(map);
tam.bindPopup("<p><u>Alutaguse marathon men's standings in 2019</u><br /><b>1. Martti Himma </b><br />2. Taavi Kaiv<br />3. Sander Linnus<br /> <a href='https://www.estoloppet.ee/en/etapid?competition_id=330'>Register here</a><br/>").addTo(map);
//legend control

//Tartu marathon
var myIcon4 = L.icon({
iconUrl: 'css/images/tartu.png',
iconSize: [35, 35]
});

var tam = L.marker([58.05, 26.46], {icon: myIcon4, title:'Tartu marathon'}).addTo(map);
tam.bindPopup("<p><u>Tartu marathon men's standings in 2019</u><br /><b>1. Niko Koskela </b> <br />2. Damien Tarantola<br />3. Fabio Lechner<br /> <a href='https://www.estoloppet.ee/en/etapid?competition_id=329'>Register here</a><br/>").addTo(map);

//Haanja marathon
var myIcon5 = L.icon({
iconUrl: 'css/images/haanja.png',
iconSize: [35, 35]
});

var tam = L.marker([57.71, 27.20], {icon: myIcon5, title:'Haanja marathon'}).addTo(map);
tam.bindPopup("<p><u>Haanja marathon men's standings in 2019</u><br /><b>1. Sander Linnus </b> <br />2. Martti Himma<br />3. Marko Kilp<br /> <a href='https://www.estoloppet.ee/en/etapid?competition_id=327'>Register here</a><br/>").addTo(map);

//adding pictures
//Tamsalu picture
var camera = L.icon({
iconUrl: 'css/images/camera.png',
iconSize: [20, 20]
});

//L.marker(center).addTo(map);
var tamc = L.marker([59.16859, 26.104616], {icon: camera}).addTo(map);
tamc.bindPopup('<img src="https://tamsalusport.ee/wp-content/uploads/2017/05/981217_1053851991302611_6281239808374651159_o-1024x640.jpg" height="256" width="300" />');

//Tallinn picture
var talc = L.marker([59.3140, 25.6540], {icon: camera}).addTo(map);
talc.bindPopup('<img src="https://www.korvemaa.ee/wp-content/uploads/IMG_96023.jpg" height="256" width="300" />');

//alutaguse picture
var alutc = L.marker([59.2466, 27.5795], {icon: camera}).addTo(map);
alutc.bindPopup('<img src="https://marathon100.com/imagecache/news_image_big/images/news/alutagusesuus0_20.jpg" height="256" width="300" />');

//tartu picture
var tartuc = L.marker([58.15, 26.42], {icon: camera}).addTo(map);
tartuc.bindPopup('<img src="https://f11.pmo.ee/1zBzJTrVLjYQb_pcc6nqFHansQ8=/685x0/smart/nginx/o/2019/01/05/11696449t1hfde7.jpg" height="256" width="300" />');

//haanja picture
var haanc = L.marker([57.717, 27.0457], {icon: camera}).addTo(map);
haanc.bindPopup('<img src="https://static1.visitestonia.com/images/647457/Haanja+Spordi-ja+Puhkekeskus+Haanja+Maratoni+ajal+Maire+Meel_.JPG" height="256" width="300" />');

//features
var features = {
	"Tamsalu-Neeruti": tamsalu,
	"Tallinn": tallinn,
	"Alutaguse": alutaguse,
	"Tartu": tartu,
	"Haanja": haan
}
//legend control
var legend = L.control.layers(baseMaps, features, {position:'bottomleft', collapsed:true}).addTo(map);
