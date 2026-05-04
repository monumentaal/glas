alert("custom.js geladen");
setTimeout(function(){
    alert("test create panel");
    createInfoPanel();
}, 2000);


const popupStyle = document.createElement('style');
popupStyle.innerHTML = `
.ol-popup{min-width:560px !important;max-width:820px !important;}
#popup-content{max-height:600px;overflow-y:auto;line-height:1.5;}
`;
document.head.appendChild(popupStyle);

let lastClickedFeature = null;
let searchResults = [];

function startApp(){

    // wacht tot map bestaat
    if(typeof map === 'undefined' || !map.getView){
        setTimeout(startApp, 500);
        return;
    }

    // wacht tot layers geladen zijn
    if(typeof layersList === 'undefined' || layersList.length === 0){
        setTimeout(startApp, 500);
        return;
    }

    // wacht tot er echt features zijn (BELANGRIJK)
    let hasFeatures = false;

    layersList.forEach(function(layer){
        if(layer.getSource && layer.getSource().getFeatures){
            if(layer.getSource().getFeatures().length > 0){
                hasFeatures = true;
            }
        }
    });

    if(!hasFeatures){
        setTimeout(startApp, 500);
        return;
    }

    // ===== PAS HIER START JE APP =====

    createInfoPanel();
    bindSearch();

    map.on('singleclick', function(evt){
        let feature = map.forEachFeatureAtPixel(evt.pixel, f=>f, {hitTolerance:10});
        if(feature) openPopup(feature, evt.coordinate);
    });

    function setStart(){
        map.getView().setCenter(ol.proj.fromLonLat([5.4,52.15]));
        map.getView().setZoom(8);
    }

    setStart();

    setTimeout(setStart,500);
    setTimeout(setStart,1500);

    setTimeout(openSharedLocation,2000);
    setTimeout(openSharedSearch,2500);
}

// start proces
startApp();
function openSharedLocation(){
 const params = new URLSearchParams(window.location.search);
 const id = params.get('id');
 if(!id) return;
 layersList.forEach(function(layer){
   if(!layer.getSource) return;
   let source = layer.getSource();
   if(!source.getFeatures) return;
   source.getFeatures().forEach(function(f){
     if(String(f.get('id')) !== String(id)) return;
     let geom = f.getGeometry();
     let coord = geom.getType()==='Point' ? geom.getCoordinates() : ol.extent.getCenter(geom.getExtent());
     map.getView().animate({center:coord,zoom:18,duration:800});
     setTimeout(function(){ openPopup(f,coord); },900);
   });
 });
}

function createInfoPanel(){
 if(document.querySelector('.info-panel')) return;
 let div=document.createElement('div');
 div.className='info-panel';
 div.style.cssText='position:absolute;top:10px;left:10px;z-index:9999;background:white;padding:10px;width:320px;box-shadow:0 2px 8px rgba(0,0,0,0.3)';
 
 div.innerHTML = `
  <div class="info-header"><b>monumentaal glas op de kaart</b></div>
  <div class="info-content" style="display:block; margin-top:10px;">
    <div>Zoek:</div>
    <input type="text" id="searchBox" placeholder="Zoek..." style="width:100%;padding:6px;">
    <div style="margin-top:10px; display:flex; gap:5px;">
       <button onclick="searchNearby()" style="flex:1; cursor:pointer;">📍 In de buurt (10km)</button>
    </div>
    <div id="searchResults" style="margin-top:8px;"></div>
    <div style="margin-top:8px;">Klik op een marker voor informatie.</div>
    <div style="margin-top:10px;"><button onclick="showInfo()">📘 Toelichting</button></div>
  </div>`;
 
 document.getElementById('map').appendChild(div);
}

function bindSearch(){
 clearPreviousHighlights();
 let searchBox=document.getElementById('searchBox'); if(!searchBox) return;
 searchBox.addEventListener('keydown', function(e){
   if(e.key!=='Enter') return;
   let query=this.value.toLowerCase().trim();
   searchResults=[];
   layersList.forEach(function(layer){
     if(!layer.getSource) return; let source=layer.getSource(); if(!source.getFeatures) return;
     source.getFeatures().forEach(function(f){ searchFeature(f,query); if(f.get('features')) f.get('features').forEach(inner=>searchFeature(inner,query)); });
   });
   showResultsList();
   if(searchResults.length > 0){
    highlightSearchResults();
    fitSearchResults();
   }
 });
}

function searchFeature(f,query){
 let props=f.getProperties();
 for(let key in props){ if(key==='geometry') continue; let val=props[key]; if(val==null||val==='') continue; if(String(val).toLowerCase().includes(query)){ searchResults.push(f); break; }}
}

function showResultsList(){

    let box = document.getElementById('searchResults');
    if(!box) return;

    box.innerHTML = '';

    if(searchResults.length === 0){
        box.innerHTML = '<i>Geen resultaten</i>';
        return;
    }

    searchResults.sort(function(a,b){
        let naamA =
            (a.get('plaats') || '') + ' ' +
            (a.get('gebouw') || a.get('kerknaam') || a.get('titel') || '');

        let naamB =
            (b.get('plaats') || '') + ' ' +
            (b.get('gebouw') || b.get('kerknaam') || b.get('titel') || '');

        return naamA.localeCompare(naamB, 'nl');
    });

    let html = `
        <div style="border:1px solid #ccc;background:#fff;padding:8px;margin-top:8px;max-height:340px;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            
               <div>
                <b>${searchResults.length} resultaten</b>
                 <button onclick="shareSearchResults()" style="margin-left:8px;">
                 🔗 Deel
                </button>
               </div>
                
                <button onclick="document.getElementById('searchResults').innerHTML=''">✖</button>
            </div>
    `;

    searchResults.forEach(function(f,i){

        let plaats = f.get('plaats') || '';
        let gebouw = f.get('gebouw') || f.get('kerknaam') || f.get('titel') || '';
        let tekst = plaats + (gebouw ? ', ' + gebouw : '');

        let symbool = '*';

        html += `
            <div style="margin:5px 0;">
                <a href="#" onclick="return selectSearchResult(${i});">
                    ${symbool} ${tekst}
                </a>
            </div>
        `;
    });

    html += `</div>`;

    box.innerHTML = html;
}


function zoomToResult(i){

    let f = searchResults[i];
    if(!f) return;

    let geom = f.getGeometry();

    let coord = geom.getType() === 'Point'
        ? geom.getCoordinates()
        : ol.extent.getCenter(geom.getExtent());

    if(coord[0] < 10){
        coord = ol.proj.fromLonLat(coord);
    }

    map.getView().animate({
        center: coord,
        zoom: 18,
        duration: 900
    });

    setTimeout(function(){
        openPopup(f, coord);
    }, 1100);

    setTimeout(function(){
        openPopup(f, coord);
    }, 1600);
}

function selectSearchResult(i){ zoomToResult(i); return false; }

function showInfo(){
 let old=document.getElementById('infoWindow'); if(old) old.remove();
 let box=document.createElement('div'); 
 box.id='infoWindow'; 
 box.style.cssText='position:fixed;top:5%;left:10%;width:80%;height:90%;background:white;border:1px solid #999;padding:15px;z-index:9999;overflow-y:auto';
 box.innerHTML=`<div style="text-align:right;"><button onclick="document.getElementById('infoWindow').remove()">✖ Sluiten</button></div><div id="infoContent">Laden...</div>`;
 document.body.appendChild(box);
 fetch(window.location.pathname.replace('index.html','')+'info.html').then(r=>r.text()).then(html=>{document.getElementById('infoContent').innerHTML=html;});
}

function openPopup(feature,coord){

 lastClickedFeature = feature;

 let overlay = map.getOverlays().getArray()[0];
 let content = document.getElementById('popup-content');

 if(!overlay || !content) return;

 content.innerHTML = '';
 overlay.setPosition(undefined);

 let props = feature.getProperties();

 let plaats = props.plaats || '';
 let gebouw = props.gebouw || props.kerknaam || '';
 let titel  = props.titel || '';

 let kop =
   (plaats && gebouw) ? plaats + ', ' + gebouw :
   (plaats && titel)  ? plaats + ', ' + titel :
   (plaats || gebouw || titel || 'locatie');

 let html = `
   <div style="font-size:18px;font-weight:bold;margin-bottom:10px;">
     ${kop}
   </div>
 `;

 for(let key in props){

   if(['geometry','id','plaats','gebouw','kerknaam','titel'].includes(key)) continue;

   let val = props[key];

   if(val === null || val === '' || val === undefined || val === 'null') continue;

   // gewone link
   if(key === 'link' || key === 'bestand'){
      html += `
        <div style="margin:6px 0;">
          <a href="${val}" target="_blank">
            <u>link naar informatie</u>
          </a>
        </div>
      `;
      continue;
   }

   // extra links via links.json
   if(key === 'link_id'){

      if(val === 0 || val === '0') continue;

      html += `
        <div id="extra-links-${val}" style="margin-top:6px;">
          <a href="#" onclick="showLinks('${val}'); return false;">
            <u>nog meer informatie</u>
          </a>
        </div>
      `;
      continue;
   }

   // gewone velden
   html += `<div style="margin-top:4px;">${val}</div>`;
 }

 content.innerHTML = html;
 overlay.setPosition(coord);
 addShareButtonToPopup();
}

ffunction showLinks(linkId){

    fetch(window.location.pathname.replace('index.html','') + 'links.json?v=' + Date.now())
    .then(r => r.json())
    .then(data => {

        const rows = data[String(linkId)] || [];
        if(rows.length === 0) return;

        const container = document.getElementById("galleryContent");
        container.innerHTML = "";

        rows.forEach(function(item, i){

            const cleanUrl = String(item.url || '').replace(/"/g,'');

            const card = document.createElement("div");

            card.style.width = "260px";
            card.style.height = "120px";
            card.style.position = "absolute";
            card.style.top = (i * 25) + "px";
            card.style.left = (i * 25) + "px";
            card.style.background = "white";
            card.style.border = "2px solid #ccc";
            card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
            card.style.padding = "10px";
            card.style.cursor = "pointer";

            card.innerHTML = `
                <div style="font-weight:bold;margin-bottom:6px;">
                    ${item.titel || 'link'}
                </div>
                <div style="font-size:12px;color:#666;">
                    klik om te openen
                </div>
            `;

            card.onclick = function(){
                window.open(cleanUrl, "_blank");
            };

            container.appendChild(card);
        });

        gallery.style.display = "flex";
    });
}

function addShareButtonToPopup(){ let popup=document.getElementById('popup-content'); if(!popup||!lastClickedFeature) return; if(popup.querySelector('.share-btn')) return; let id=lastClickedFeature.get('id'); if(!id) return; let btn=document.createElement('button'); btn.className='share-btn'; btn.innerText='🔗 deel deze locatie'; btn.style.cssText='margin-top:12px;padding:6px 10px;cursor:pointer'; btn.onclick=function(){ let url=window.location.origin+window.location.pathname+'?id='+id; navigator.clipboard.writeText(url).then(()=>alert('Link staat op klembord')).catch(()=>alert(url));}; popup.appendChild(btn); }

function fitSearchResults(){

    if(searchResults.length === 0) return;

    let extent = ol.extent.createEmpty();

    searchResults.forEach(function(f){

        let geom = f.getGeometry();
        if(!geom) return;

        ol.extent.extend(extent, geom.getExtent());
    });

    map.getView().fit(extent, {
        padding: [60,60,60,60],
        duration: 800,
        maxZoom: 15
    });
}

function highlightSearchResults(){

    searchResults.forEach(function(f){

        if(!f || !f.setStyle) return;

        f.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 9,
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,0,0.9)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                })
            })
        }));
    });

    setTimeout(function(){

        searchResults.forEach(function(f){
            if(f && f.setStyle){
                f.setStyle(null);
            }
        });

    }, 15000);
}

function shareSearchResults(){

    let q = document.getElementById('searchBox').value.trim();

    if(!q) return;

    let url =
        window.location.origin +
        window.location.pathname +
        '?search=' + encodeURIComponent(q);

    navigator.clipboard.writeText(url)
        .then(() => alert('Zoeklink staat op klembord'))
        .catch(() => alert(url));
}

function openSharedSearch(){

    let box = document.getElementById('searchBox');
    if(!box || typeof layersList === 'undefined'){
        setTimeout(openSharedSearch, 1000);
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const q = params.get('search');

    if(!q) return;

    box.value = q;

    searchResults = [];

    layersList.forEach(function(layer){

        if(!layer.getSource) return;
        let source = layer.getSource();
        if(!source.getFeatures) return;

        source.getFeatures().forEach(function(f){

            searchFeature(f, q.toLowerCase());

            if(f.get('features')){
                f.get('features').forEach(function(inner){
                    searchFeature(inner, q.toLowerCase());
                });
            }
        });
    });

    showResultsList();
    highlightSearchResults();
    fitSearchResults();
}


// --- NIEUWE FUNCTIES ONDERAAN CUSTOM.JS ---

window.searchNearby = function() {
    if (!navigator.geolocation) {
        alert("Geolocatie wordt niet ondersteund.");
        return;
    }
    
    // Roep de opschoonfunctie aan
    clearPreviousHighlights();

    navigator.geolocation.getCurrentPosition(function(position) {
        const userLonLat = [position.coords.longitude, position.coords.latitude];
        searchResults = [];
        const radiusKm = 10;

        layersList.forEach(function(layer) {
            if (!layer.getSource || !layer.getSource().getFeatures) return;
            layer.getSource().getFeatures().forEach(function(f) {
                checkDistance(f, userLonLat, radiusKm);
                if (f.get('features')) {
                    f.get('features').forEach(inner => checkDistance(inner, userLonLat, radiusKm));
                }
            });
        });

        showResultsList();
        if (searchResults.length > 0) {
            highlightSearchResults(); 
            fitSearchResults();
        } else {
            alert("Niets gevonden binnen 10km.");
        }
    }, function(err) {
        alert("Locatie-fout: " + err.message);
    });
};

function checkDistance(f, userLonLat, radiusKm) {
    let geom = f.getGeometry();
    if (!geom) return;
    
    let featCoord = geom.getType() === 'Point' 
        ? geom.getCoordinates() 
        : ol.extent.getCenter(geom.getExtent());

    let finalLonLat;

    // CHECK: Zijn de coördinaten in meters? (bijv. 150000 of 6000000)
    if (Math.abs(featCoord[0]) > 500) {
        // Omzetten van meters (EPSG:3857 of EPSG:28992) naar graden (EPSG:4326)
        // We gaan ervan uit dat de kaart-view projectie de bron is
        finalLonLat = ol.proj.toLonLat(featCoord, map.getView().getProjection());
    } else {
        // Het zijn al graden, maar staan ze in Lat/Lon of Lon/Lat?
        let lon, lat;
        if (Math.abs(featCoord[0]) > Math.abs(featCoord[1])) {
            lat = featCoord[0];
            lon = featCoord[1];
        } else {
            lon = featCoord[0];
            lat = featCoord[1];
        }
        finalLonLat = [lon, lat];
    }

    // Bereken de afstand met de nu gegarandeerde [Lon, Lat] in graden
    const distance = ol.sphere.getDistance(userLonLat, finalLonLat) / 1000;

    // Debugging in F12 console
    console.log(`Gevonden op ${distance.toFixed(2)} km. Coördinaten gebruikt:`, finalLonLat);

    if (distance <= radiusKm) {
        searchResults.push(f);
    }
}
function clearPreviousHighlights() {
    // Wis de lijst met resultaten
    searchResults = [];
    // Reset alle stijlen op de kaart
    layersList.forEach(function(layer) {
        if (!layer.getSource || !layer.getSource().getFeatures) return;
        layer.getSource().getFeatures().forEach(function(f) {
            if (f.setStyle) f.setStyle(null);
            if (f.get('features')) {
                f.get('features').forEach(inner => { if(inner.setStyle) inner.setStyle(null); });
            }
        });
    });
}
const gallery = document.createElement('div');

gallery.id = "photoGallery";
gallery.style.position = "fixed";
gallery.style.top = "0";
gallery.style.left = "0";
gallery.style.width = "100%";
gallery.style.height = "100%";
gallery.style.background = "rgba(0,0,0,0.3)";
gallery.style.display = "none";
gallery.style.zIndex = "99999";
gallery.style.justifyContent = "center";
gallery.style.alignItems = "center";

gallery.innerHTML = `
    <div id="galleryContent" style="
        position:relative;
        max-width:90%;
        max-height:90%;
    "></div>
`;

document.body.appendChild(gallery);

// sluiten bij klik buiten
gallery.onclick = function(e){
    if(e.target.id === "photoGallery"){
        gallery.style.display = "none";
        document.getElementById("galleryContent").innerHTML = "";
    }
};
