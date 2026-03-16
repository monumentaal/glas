var wms_layers = [];

var format_oostbrabant_0 = new ol.format.GeoJSON();
var features_oostbrabant_0 = format_oostbrabant_0.readFeatures(json_oostbrabant_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_oostbrabant_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_oostbrabant_0.addFeatures(features_oostbrabant_0);
var lyr_oostbrabant_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_oostbrabant_0, 
                style: style_oostbrabant_0,
                popuplayertitle: 'oostbrabant',
                interactive: true,
                title: '<img src="styles/legend/oostbrabant_0.png" /> oostbrabant'
            });
var format_maas_en_waal_1 = new ol.format.GeoJSON();
var features_maas_en_waal_1 = format_maas_en_waal_1.readFeatures(json_maas_en_waal_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_1.addFeatures(features_maas_en_waal_1);
var lyr_maas_en_waal_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_1, 
                style: style_maas_en_waal_1,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_1.png" /> maas_en_waal'
            });
var format_persberichten_2 = new ol.format.GeoJSON();
var features_persberichten_2 = format_persberichten_2.readFeatures(json_persberichten_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_persberichten_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_persberichten_2.addFeatures(features_persberichten_2);
var lyr_persberichten_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_persberichten_2, 
                style: style_persberichten_2,
                popuplayertitle: 'persberichten',
                interactive: true,
                title: '<img src="styles/legend/persberichten_2.png" /> persberichten'
            });
var format_kerkfotografie_3 = new ol.format.GeoJSON();
var features_kerkfotografie_3 = format_kerkfotografie_3.readFeatures(json_kerkfotografie_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kerkfotografie_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kerkfotografie_3.addFeatures(features_kerkfotografie_3);
var lyr_kerkfotografie_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_kerkfotografie_3, 
                style: style_kerkfotografie_3,
                popuplayertitle: 'kerkfotografie',
                interactive: true,
                title: '<img src="styles/legend/kerkfotografie_3.png" /> kerkfotografie'
            });
var format_mijnstreek_4 = new ol.format.GeoJSON();
var features_mijnstreek_4 = format_mijnstreek_4.readFeatures(json_mijnstreek_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mijnstreek_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mijnstreek_4.addFeatures(features_mijnstreek_4);
var lyr_mijnstreek_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_mijnstreek_4, 
                style: style_mijnstreek_4,
                popuplayertitle: 'mijnstreek',
                interactive: true,
                title: '<img src="styles/legend/mijnstreek_4.png" /> mijnstreek'
            });

lyr_oostbrabant_0.setVisible(true);lyr_maas_en_waal_1.setVisible(true);lyr_persberichten_2.setVisible(true);lyr_kerkfotografie_3.setVisible(true);lyr_mijnstreek_4.setVisible(true);
var layersList = [lyr_oostbrabant_0,lyr_maas_en_waal_1,lyr_persberichten_2,lyr_kerkfotografie_3,lyr_mijnstreek_4];
lyr_oostbrabant_0.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerknaam': 'kerknaam', 'bestand': 'bestand', });
lyr_maas_en_waal_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', });
lyr_persberichten_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'link': 'link', 'gebouw': 'gebouw', 'extra': 'extra', });
lyr_kerkfotografie_3.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_oostbrabant_0.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerknaam': 'TextEdit', 'bestand': 'TextEdit', });
lyr_maas_en_waal_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', });
lyr_persberichten_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'link': 'TextEdit', 'gebouw': 'TextEdit', 'extra': 'TextEdit', });
lyr_kerkfotografie_3.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_oostbrabant_0.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerknaam': 'no label', 'bestand': 'no label', });
lyr_maas_en_waal_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', });
lyr_persberichten_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'link': 'no label', 'gebouw': 'no label', 'extra': 'no label', });
lyr_kerkfotografie_3.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});