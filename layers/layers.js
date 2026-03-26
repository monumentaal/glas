<script>
window.json_community = {
  "type": "FeatureCollection",
  "features": []
};
console.log("INLINE COMMUNITY OK");
</script>



var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_oostbrabant_1 = new ol.format.GeoJSON();
var features_oostbrabant_1 = format_oostbrabant_1.readFeatures(json_oostbrabant_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_oostbrabant_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_oostbrabant_1.addFeatures(features_oostbrabant_1);
var lyr_oostbrabant_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_oostbrabant_1, 
                style: style_oostbrabant_1,
                popuplayertitle: 'oostbrabant',
                interactive: true,
                title: '<img src="styles/legend/oostbrabant_1.png" /> oostbrabant'
            });
var format_maas_en_waal_2 = new ol.format.GeoJSON();
var features_maas_en_waal_2 = format_maas_en_waal_2.readFeatures(json_maas_en_waal_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_maas_en_waal_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_maas_en_waal_2.addFeatures(features_maas_en_waal_2);
var lyr_maas_en_waal_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_maas_en_waal_2, 
                style: style_maas_en_waal_2,
                popuplayertitle: 'maas_en_waal',
                interactive: true,
                title: '<img src="styles/legend/maas_en_waal_2.png" /> maas_en_waal'
            });
var format_persberichten_3 = new ol.format.GeoJSON();
var features_persberichten_3 = format_persberichten_3.readFeatures(json_persberichten_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_persberichten_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_persberichten_3.addFeatures(features_persberichten_3);
var lyr_persberichten_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_persberichten_3, 
                style: style_persberichten_3,
                popuplayertitle: 'persberichten',
                interactive: true,
                title: '<img src="styles/legend/persberichten_3.png" /> persberichten'
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
// --- COMMUNITY LAYER ---
//var format_community = new ol.format.GeoJSON();
//var features_community = format_community.readFeatures(json_community, 
//    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});

//var jsonSource_community = new ol.source.Vector({
//    attributions: ' ',
//});
//jsonSource_community.addFeatures(features_community);

//var lyr_layer_community = new ol.layer.Vector({
//    declutter: true,
//    source: jsonSource_community,
//    style: style_kerkfotografie_4, // gebruik bestaande style
//    interactive: true,
//    title: 'Community inzendingen'
//});

lyr_OpenStreetMap_0.setVisible(true);lyr_oostbrabant_1.setVisible(true);lyr_maas_en_waal_2.setVisible(true);lyr_persberichten_3.setVisible(true);lyr_kerkfotografie_4.setVisible(true);lyr_mijnstreek_5.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_oostbrabant_1,lyr_maas_en_waal_2,lyr_persberichten_3,lyr_kerkfotografie_4,lyr_mijnstreek_5;
lyr_oostbrabant_1.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerknaam': 'kerknaam', 'bestand': 'bestand', });
lyr_maas_en_waal_2.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'kerk': 'kerk', 'link': 'link', });
lyr_persberichten_3.set('fieldAliases', {'id': 'id', 'bron': 'bron', 'link': 'link', 'gebouw': 'gebouw', });
lyr_kerkfotografie_4.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_mijnstreek_5.set('fieldAliases', {'id': 'id', 'plaats': 'plaats', 'gebouw': 'gebouw', 'link': 'link', });
lyr_oostbrabant_1.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerknaam': 'TextEdit', 'bestand': 'TextEdit', });
lyr_maas_en_waal_2.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'kerk': 'TextEdit', 'link': 'TextEdit', });
lyr_persberichten_3.set('fieldImages', {'id': 'TextEdit', 'bron': 'TextEdit', 'link': 'TextEdit', 'gebouw': 'TextEdit', });
lyr_kerkfotografie_4.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_mijnstreek_5.set('fieldImages', {'id': 'TextEdit', 'plaats': 'TextEdit', 'gebouw': 'TextEdit', 'link': 'TextEdit', });
lyr_oostbrabant_1.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerknaam': 'no label', 'bestand': 'no label', });
lyr_maas_en_waal_2.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'kerk': 'no label', 'link': 'no label', });
lyr_persberichten_3.set('fieldLabels', {'id': 'no label', 'bron': 'no label', 'link': 'no label', 'gebouw': 'no label', });
lyr_kerkfotografie_4.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_5.set('fieldLabels', {'id': 'no label', 'plaats': 'no label', 'gebouw': 'no label', 'link': 'no label', });
lyr_mijnstreek_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
