var wms_layers = [];


        var lyr_EsriStreet_0 = new ol.layer.Tile({
            'title': 'Esri Street',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
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
var format_kunstenaars_4 = new ol.format.GeoJSON();
var features_kunstenaars_4 = format_kunstenaars_4.readFeatures(json_kunstenaars_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kunstenaars_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kunstenaars_4.addFeatures(features_kunstenaars_4);
var lyr_kunstenaars_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_kunstenaars_4, 
                style: style_kunstenaars_4,
                popuplayertitle: 'kunstenaars',
                interactive: true,
                title: '<img src="styles/legend/kunstenaars_4.png" /> kunstenaars'
            });
var format_kerkfotografie_5 = new ol.format.GeoJSON();
var features_kerkfotografie_5 = format_kerkfotografie_5.readFeatures(json_kerkfotografie_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_kerkfotografie_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_kerkfotografie_5.addFeatures(features_kerkfotografie_5);
var lyr_kerkfotografie_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_kerkfotografie_5, 
                style: style_kerkfotografie_5,
                popuplayertitle: 'kerkfotografie',
                interactive: true,
                title: '<img src="styles/legend/kerkfotografie_5.png" /> kerkfotografie'
            });
var format_mijnstreek_6 = new ol.format.GeoJSON();
var features_mijnstreek_6 = format_mijnstreek_6.readFeatures(json_mijnstreek_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_mijnstreek_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_mijnstreek_6.addFeatures(features_mijnstreek_6);
var lyr_mijnstreek_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_mijnstreek_6, 
                style: style_mijnstreek_6,
                popuplayertitle: 'mijnstreek',
                interactive: true,
                title: '<img src="styles/legend/mijnstreek_6.png" /> mijnstreek'
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
var format_maas_en_waal_8 = new ol.format.GeoJSON();
var features_maas_en_waal_8 = format_maas_en_waal_8.readFeatures(json_maas_en_waal_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_8.addFeatures(features_maas_en_waal_8);
var lyr_maas_en_waal_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_8, 
                style: style_maas_en_waal_8,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_8.png" /> maas_en_waal'
            });
var format_beeldbankRCE_9 = new ol.format.GeoJSON();
var features_beeldbankRCE_9 = format_beeldbankRCE_9.readFeatures(json_beeldbankRCE_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_beeldbankRCE_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_beeldbankRCE_9.addFeatures(features_beeldbankRCE_9);
var lyr_beeldbankRCE_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_beeldbankRCE_9, 
                style: style_beeldbankRCE_9,
                popuplayertitle: 'beeldbank RCE',
                interactive: true,
                title: '<img src="styles/legend/beeldbankRCE_9.png" /> beeldbank RCE'
            });
var format_limburg_10 = new ol.format.GeoJSON();
var features_limburg_10 = format_limburg_10.readFeatures(json_limburg_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_limburg_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_limburg_10.addFeatures(features_limburg_10);
var lyr_limburg_10 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_limburg_10, 
                style: style_limburg_10,
                popuplayertitle: 'limburg',
                interactive: true,
                title: '<img src="styles/legend/limburg_10.png" /> limburg'
            });

lyr_EsriStreet_0.setVisible(true);lyr_webpaginas_1.setVisible(true);lyr_boeken_2.setVisible(true);lyr_pers_3.setVisible(true);lyr_kunstenaars_4.setVisible(true);lyr_kerkfotografie_5.setVisible(true);lyr_mijnstreek_6.setVisible(true);lyr_oostbrabant_7.setVisible(true);lyr_maas_en_waal_8.setVisible(true);lyr_beeldbankRCE_9.setVisible(true);lyr_limburg_10.setVisible(true);
var layersList = [lyr_EsriStreet_0,lyr_webpaginas_1,lyr_boeken_2,lyr_pers_3,lyr_kunstenaars_4,lyr_kerkfotografie_5,lyr_mijnstreek_6,lyr_oostbrabant_7,lyr_maas_en_waal_8,lyr_beeldbankRCE_9,lyr_limburg_10];
lyr_webpaginas_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'link': 'link', 'gebouw': 'gebouw', 'extra': 'extra', 'trefwoord': 'trefwoord', });
lyr_boeken_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'titel': 'titel', 'auteur': 'auteur', 'uitgever': 'uitgever', 'isbn': 'isbn', 'trefwoord': 'trefwoord', });
lyr_pers_3.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', 'trefwoord': 'trefwoord', });
lyr_kunstenaars_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'kuntenaar': 'kuntenaar', 'titel': 'titel', 'link': 'link', });
lyr_kerkfotografie_5.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_6.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', 'trefwoord': 'trefwoord', });
lyr_oostbrabant_7.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerknaam': 'kerknaam', 'bestand': 'bestand', 'trefwoord': 'trefwoord', });
lyr_maas_en_waal_8.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', 'trefwoord': 'trefwoord', });
lyr_beeldbankRCE_9.set('fieldAliases', {'id': 'id', 'paats': 'paats', 'adres': 'adres', 'gebouw': 'gebouw', 'link': 'link', 'trefwoord': 'trefwoord', 'link_id': 'link_id', });
lyr_limburg_10.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', 'trefwoord': 'trefwoord', });
lyr_webpaginas_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'link': 'TextEdit', 'gebouw': 'TextEdit', 'extra': 'TextEdit', 'trefwoord': '', });
lyr_boeken_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'titel': 'TextEdit', 'auteur': 'TextEdit', 'uitgever': 'TextEdit', 'isbn': 'TextEdit', 'trefwoord': '', });
lyr_pers_3.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', 'trefwoord': '', });
lyr_kunstenaars_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'kuntenaar': 'TextEdit', 'titel': 'TextEdit', 'link': 'TextEdit', });
lyr_kerkfotografie_5.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_6.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', 'trefwoord': '', });
lyr_oostbrabant_7.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerknaam': 'TextEdit', 'bestand': 'TextEdit', 'trefwoord': '', });
lyr_maas_en_waal_8.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', 'trefwoord': '', });
lyr_beeldbankRCE_9.set('fieldImages', {'id': 'TextEdit', 'paats': 'TextEdit', 'adres': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', 'trefwoord': 'TextEdit', 'link_id': 'TextEdit', });
lyr_limburg_10.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', 'trefwoord': '', });
lyr_webpaginas_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'link': 'no label', 'gebouw': 'no label', 'extra': 'no label', 'trefwoord': 'no label', });
lyr_boeken_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'titel': 'no label', 'auteur': 'no label', 'uitgever': 'no label', 'isbn': 'no label', 'trefwoord': 'no label', });
lyr_pers_3.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', 'trefwoord': 'no label', });
lyr_kunstenaars_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'kuntenaar': 'no label', 'titel': 'no label', 'link': 'no label', });
lyr_kerkfotografie_5.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_6.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', 'trefwoord': 'no label', });
lyr_oostbrabant_7.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerknaam': 'no label', 'bestand': 'no label', 'trefwoord': 'no label', });
lyr_maas_en_waal_8.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', 'trefwoord': 'no label', });
lyr_beeldbankRCE_9.set('fieldLabels', {'id': 'no label', 'paats': 'no label', 'adres': 'no label', 'gebouw': 'no label', 'link': 'no label', 'trefwoord': 'no label', 'link_id': 'no label', });
lyr_limburg_10.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', 'trefwoord': 'no label', });
lyr_limburg_10.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});