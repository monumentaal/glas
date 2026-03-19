var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_boeken_1 = new ol.format.GeoJSON();
var features_boeken_1 = format_boeken_1.readFeatures(json_boeken_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_boeken_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_boeken_1.addFeatures(features_boeken_1);
var lyr_boeken_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_boeken_1, 
                style: style_boeken_1,
                popuplayertitle: 'boeken',
                interactive: true,
                title: '<img src="styles/legend/boeken_1.png" /> boeken'
            });
var format_pers_2 = new ol.format.GeoJSON();
var features_pers_2 = format_pers_2.readFeatures(json_pers_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_pers_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_pers_2.addFeatures(features_pers_2);
var lyr_pers_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_pers_2, 
                style: style_pers_2,
                popuplayertitle: 'pers',
                interactive: true,
                title: '<img src="styles/legend/pers_2.png" /> pers'
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
var format_maas_en_waal_5 = new ol.format.GeoJSON();
var features_maas_en_waal_5 = format_maas_en_waal_5.readFeatures(json_maas_en_waal_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_5.addFeatures(features_maas_en_waal_5);
var lyr_maas_en_waal_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_5, 
                style: style_maas_en_waal_5,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_5.png" /> maas_en_waal'
            });
var format_oostbrabant_6 = new ol.format.GeoJSON();
var features_oostbrabant_6 = format_oostbrabant_6.readFeatures(json_oostbrabant_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_oostbrabant_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_oostbrabant_6.addFeatures(features_oostbrabant_6);
var lyr_oostbrabant_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_oostbrabant_6, 
                style: style_oostbrabant_6,
                popuplayertitle: 'oostbrabant',
                interactive: true,
                title: '<img src="styles/legend/oostbrabant_6.png" /> oostbrabant'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_boeken_1.setVisible(true);lyr_pers_2.setVisible(true);lyr_kerkfotografie_3.setVisible(true);lyr_mijnstreek_4.setVisible(true);lyr_maas_en_waal_5.setVisible(true);lyr_oostbrabant_6.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_boeken_1,lyr_pers_2,lyr_kerkfotografie_3,lyr_mijnstreek_4,lyr_maas_en_waal_5,lyr_oostbrabant_6];
lyr_boeken_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'titel': 'titel', 'auteur': 'auteur', 'uitgever': 'uitgever', 'isbn': 'isbn', });
lyr_pers_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_kerkfotografie_3.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_maas_en_waal_5.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', });
lyr_oostbrabant_6.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerknaam': 'kerknaam', 'bestand': 'bestand', });
lyr_boeken_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'titel': 'TextEdit', 'auteur': 'TextEdit', 'uitgever': 'TextEdit', 'isbn': 'TextEdit', });
lyr_pers_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_kerkfotografie_3.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_maas_en_waal_5.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', });
lyr_oostbrabant_6.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerknaam': 'TextEdit', 'bestand': 'TextEdit', });
lyr_boeken_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'titel': 'no label', 'auteur': 'no label', 'uitgever': 'no label', 'isbn': 'no label', });
lyr_pers_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_kerkfotografie_3.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_maas_en_waal_5.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', });
lyr_oostbrabant_6.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerknaam': 'no label', 'bestand': 'no label', });
lyr_oostbrabant_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});