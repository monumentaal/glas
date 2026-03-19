var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_pers_1 = new ol.format.GeoJSON();
var features_pers_1 = format_pers_1.readFeatures(json_pers_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_pers_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_pers_1.addFeatures(features_pers_1);
var lyr_pers_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_pers_1, 
                style: style_pers_1,
                popuplayertitle: 'pers',
                interactive: true,
                title: '<img src="styles/legend/pers_1.png" /> pers'
            });
var format_kerkfotografie_2 = new ol.format.GeoJSON();
var features_kerkfotografie_2 = format_kerkfotografie_2.readFeatures(json_kerkfotografie_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kerkfotografie_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kerkfotografie_2.addFeatures(features_kerkfotografie_2);
var lyr_kerkfotografie_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_kerkfotografie_2, 
                style: style_kerkfotografie_2,
                popuplayertitle: 'kerkfotografie',
                interactive: true,
                title: '<img src="styles/legend/kerkfotografie_2.png" /> kerkfotografie'
            });
var format_mijnstreek_3 = new ol.format.GeoJSON();
var features_mijnstreek_3 = format_mijnstreek_3.readFeatures(json_mijnstreek_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mijnstreek_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mijnstreek_3.addFeatures(features_mijnstreek_3);
var lyr_mijnstreek_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_mijnstreek_3, 
                style: style_mijnstreek_3,
                popuplayertitle: 'mijnstreek',
                interactive: true,
                title: '<img src="styles/legend/mijnstreek_3.png" /> mijnstreek'
            });
var format_maas_en_waal_4 = new ol.format.GeoJSON();
var features_maas_en_waal_4 = format_maas_en_waal_4.readFeatures(json_maas_en_waal_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_4.addFeatures(features_maas_en_waal_4);
var lyr_maas_en_waal_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_4, 
                style: style_maas_en_waal_4,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_4.png" /> maas_en_waal'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_pers_1.setVisible(true);lyr_kerkfotografie_2.setVisible(true);lyr_mijnstreek_3.setVisible(true);lyr_maas_en_waal_4.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_pers_1,lyr_kerkfotografie_2,lyr_mijnstreek_3,lyr_maas_en_waal_4];
lyr_pers_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_kerkfotografie_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_3.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_maas_en_waal_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', });
lyr_pers_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_kerkfotografie_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_3.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_maas_en_waal_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', });
lyr_pers_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_kerkfotografie_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_3.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_maas_en_waal_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', });
lyr_maas_en_waal_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});