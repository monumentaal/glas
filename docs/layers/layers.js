console.log("START layers.js");

var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap', 
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_webpaginas_1 = new ol.format.GeoJSON();
var features_webpaginas_1 = format_webpaginas_1.readFeatures(json_webpaginas_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_webpaginas_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_webpaginas_1.addFeatures(features_webpaginas_1);
var lyr_webpaginas_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_webpaginas_1, 
                style: style_webpaginas_1,
                popuplayertitle: 'webpaginas',
                interactive: true,
                title: '<img src="styles/legend/webpaginas_1.png" /> webpaginas'
            });
var format_boeken_2 = new ol.format.GeoJSON();
var features_boeken_2 = format_boeken_2.readFeatures(json_boeken_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_boeken_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_boeken_2.addFeatures(features_boeken_2);
var lyr_boeken_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_boeken_2, 
                style: style_boeken_2,
                popuplayertitle: 'boeken',
                interactive: true,
                title: '<img src="styles/legend/boeken_2.png" /> boeken'
            });
var format_pers_3 = new ol.format.GeoJSON();
var features_pers_3 = format_pers_3.readFeatures(json_pers_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_pers_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_pers_3.addFeatures(features_pers_3);
var lyr_pers_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_pers_3, 
                style: style_pers_3,
                popuplayertitle: 'pers',
                interactive: true,
                title: '<img src="styles/legend/pers_3.png" /> pers'
            });
var format_kerkfotografie_4 = new ol.format.GeoJSON();
var features_kerkfotografie_4 = format_kerkfotografie_4.readFeatures(json_kerkfotografie_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kerkfotografie_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kerkfotografie_4.addFeatures(features_kerkfotografie_4);
var lyr_kerkfotografie_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_kerkfotografie_4, 
                style: style_kerkfotografie_4,
                popuplayertitle: 'kerkfotografie',
                interactive: true,
                title: '<img src="styles/legend/kerkfotografie_4.png" /> kerkfotografie'
            });
var format_mijnstreek_5 = new ol.format.GeoJSON();
var features_mijnstreek_5 = format_mijnstreek_5.readFeatures(json_mijnstreek_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mijnstreek_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mijnstreek_5.addFeatures(features_mijnstreek_5);
var lyr_mijnstreek_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_mijnstreek_5, 
                style: style_mijnstreek_5,
                popuplayertitle: 'mijnstreek',
                interactive: true,
                title: '<img src="styles/legend/mijnstreek_5.png" /> mijnstreek'
            });
var format_maas_en_waal_6 = new ol.format.GeoJSON();
var features_maas_en_waal_6 = format_maas_en_waal_6.readFeatures(json_maas_en_waal_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_6.addFeatures(features_maas_en_waal_6);
var lyr_maas_en_waal_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_6, 
                style: style_maas_en_waal_6,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_6.png" /> maas_en_waal'
            });
var format_oostbrabant_7 = new ol.format.GeoJSON();
var features_oostbrabant_7 = format_oostbrabant_7.readFeatures(json_oostbrabant_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_oostbrabant_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_oostbrabant_7.addFeatures(features_oostbrabant_7);
var lyr_oostbrabant_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_oostbrabant_7, 
                style: style_oostbrabant_7,
                popuplayertitle: 'oostbrabant',
                interactive: true,
                title: '<img src="styles/legend/oostbrabant_7.png" /> oostbrabant'
            });

// COMMUNITY LAYER
var format_community = new ol.format.GeoJSON();
var features_community = format_community.readFeatures(json_community, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});

var source_community = new ol.source.Vector({
    features: features_community
});

var layer_community = new ol.layer.Vector({


     
    declutter: false,
    source: source_community,
    title: 'limburg',
    popuplayertitle: 'limburg',   
    style: function(feature) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: 'red'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffffff',
                    width: 1
                })
            })  //image
        }); //return
    } // style
}); //var


lyr_OpenStreetMap_0.setVisible(true);
lyr_webpaginas_1.setVisible(true);
lyr_boeken_2.setVisible(true);
lyr_pers_3.setVisible(true);
lyr_kerkfotografie_4.setVisible(true);
lyr_mijnstreek_5.setVisible(true);
lyr_maas_en_waal_6.setVisible(true);
lyr_oostbrabant_7.setVisible(true);
layer_community.setVisible(true);

console.log("VOOR layersList");

var layersList = [
  lyr_OpenStreetMap_0,
  lyr_webpaginas_1,
  lyr_boeken_2,
  lyr_pers_3,
  lyr_kerkfotografie_4,
  lyr_mijnstreek_5,
  lyr_maas_en_waal_6,
  lyr_oostbrabant_7,
  layer_community
];
lyr_webpaginas_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'link': 'link', 'gebouw': 'gebouw', 'extra': 'extra', });
lyr_boeken_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'titel': 'titel', 'auteur': 'auteur', 'uitgever': 'uitgever', 'isbn': 'isbn', });
lyr_pers_3.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_kerkfotografie_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_5.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_maas_en_waal_6.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', });
lyr_oostbrabant_7.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerknaam': 'kerknaam', 'bestand': 'bestand', });
lyr_webpaginas_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'link': 'TextEdit', 'gebouw': 'TextEdit', 'extra': 'TextEdit', });
lyr_boeken_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'titel': 'TextEdit', 'auteur': 'TextEdit', 'uitgever': 'TextEdit', 'isbn': 'TextEdit', });
lyr_pers_3.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_kerkfotografie_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_5.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_maas_en_waal_6.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', });
lyr_oostbrabant_7.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerknaam': 'TextEdit', 'bestand': 'TextEdit', });
lyr_webpaginas_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'link': 'no label', 'gebouw': 'no label', 'extra': 'no label', });
lyr_boeken_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'titel': 'no label', 'auteur': 'no label', 'uitgever': 'no label', 'isbn': 'no label', });
lyr_pers_3.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_kerkfotografie_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_5.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_maas_en_waal_6.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', });
lyr_oostbrabant_7.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerknaam': 'no label', 'bestand': 'no label', });
lyr_oostbrabant_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
layer_community.set('fieldAliases', {
    'name': 'Naam',
    'straat': 'Straat',
    'huisnummer': 'Huisnr',
    'postcode': 'Postcode',
    'plaats': 'Plaats',
    'url': 'Website'
});

layer_community.set('fieldImages', {
    'name': 'TextEdit',
    'straat': 'TextEdit',
    'huisnummer': 'TextEdit',
    'postcode': 'TextEdit',
    'plaats': 'TextEdit',
    'url': 'TextEdit'
});

layer_community.set('fieldLabels', {
    'name': 'inline label',
    'straat': 'inline label',
    'huisnummer': 'inline label',
    'postcode': 'inline label',
    'plaats': 'inline label',
    'url': 'inline label'
});
