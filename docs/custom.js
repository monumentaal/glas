/* Volledig herbouwde custom.js met behoud van bestaande functionaliteit */
/* ===== popup breder maken ===== */
const popupStyle = document.createElement('style');
popupStyle.innerHTML = `
.ol-popup{min-width:560px !important;max-width:820px !important;}
#popup-content{max-height:600px;overflow-y:auto;line-height:1.5;}
`;
document.head.appendChild(popupStyle);

let lastClickedFeature = null;
let searchResults = [];

window.addEventListener('load', function(){
 setTimeout(function(){
   map.getView().setCenter(ol.proj.fromLonLat([5.4,52.15]));
   map.getView().setZoom(8);
   setTimeout(function(){map.getView().setCenter(ol.proj.fromLonLat([5.4,52.15]));map.getView().setZoom(8);},200);
   createInfoPanel();
   bindSearch();
   map.on('singleclick', function(evt){
     let feature = map.forEachFeatureAtPixel(evt.pixel, f=>f, {hitTolerance:10});
     if(feature) openPopup(feature, evt.coordinate);
   });
 },1000);
});

function createInfoPanel(){
 if(document.querySelector('.info-panel')) return;
 let div=document.createElement('div');
 div.className='info-panel';
 div.style.cssText='position:absolute;top:10px;left:10px;z-index:9999;background:white;padding:10px;width:320px;box-shadow:0 2px 8px rgba(0,0,0,0.3)';
 div.innerHTML=`<div class="info-header"><b>monumentaal glas op de kaart</b></div><div class="info-content" style="display:block; margin-top:10px;"><div>Zoek:</div><input type="text" id="searchBox" placeholder="Zoek..." style="width:100%;padding:6px;"><div id="searchResults" style="margin-top:8px;"></div><div style="margin-top:8px;">Klik op een marker voor informatie.</div><div style="margin-top:10px;"><button onclick="showInfo()">📘 Toelichting</button></div></div>`;
 document.getElementById('map').appendChild(div);
}

function bindSearch(){
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
   if(searchResults.length>0) zoomToResult(0);
 });
}

function searchFeature(f,query){
 let props=f.getProperties();
 for(let key in props){ if(key==='geometry') continue; let val=props[key]; if(val==null||val==='') continue; if(String(val).toLowerCase().includes(query)){ searchResults.push(f); break; }}
}

function showResultsList(){
 let box=document.getElementById('searchResults'); if(!box) return; box.innerHTML='';
 if(searchResults.length===0){ box.innerHTML='<i>Geen resultaten</i>'; return; }
 searchResults.sort(function(a,b){
   let naamA=(a.get('plaats')||'')+' '+(a.get('gebouw')||a.get('kerknaam')||a.get('titel')||'');
   let naamB=(b.get('plaats')||'')+' '+(b.get('gebouw')||b.get('kerknaam')||b.get('titel')||'');
   return naamA.localeCompare(naamB,'nl');
 });
 let html=`<div style="border:1px solid #ccc;background:#fff;padding:8px;margin-top:8px;max-height:340px;overflow-y:auto;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b>${searchResults.length} resultaten</b><button onclick="document.getElementById('searchResults').innerHTML=''">✖</button></div>`;
 searchResults.forEach(function(f,i){ let plaats=f.get('plaats')||''; let gebouw=f.get('gebouw')||f.get('kerknaam')||f.get('titel')||''; let tekst=plaats+(gebouw?', '+gebouw:''); html+=`<div style="margin:5px 0;"><a href="#" onclick="return selectSearchResult(${i});">${tekst}</a></div>`;});
 html+='</div>'; box.innerHTML=html;
}

function zoomToResult(i){
 let f=searchResults[i]; if(!f) return; let geom=f.getGeometry(); let coord=geom.getType()==='Point'?geom.getCoordinates():ol.extent.getCenter(geom.getExtent());
 if(coord[0]<10) coord=ol.proj.fromLonLat(coord);
 map.getView().animate({center:coord,zoom:18,duration:700});
 setTimeout(function(){openPopup(f,coord);},750);
}
function selectSearchResult(i){ zoomToResult(i); return false; }

function showInfo(){
 let old=document.getElementById('infoWindow'); if(old) old.remove();
 let box=document.createElement('div'); box.id='infoWindow'; box.style.cssText='position:fixed;top:10%;left:10%;width:80%;height:75%;background:white;border:1px solid #999;padding:15px;z-index:9999;overflow-y:auto';
 box.innerHTML=`<div style="text-align:right;"><button onclick="document.getElementById('infoWindow').remove()">✖ Sluiten</button></div><div id="infoContent">Laden...</div>`;
 document.body.appendChild(box);
 fetch(window.location.pathname.replace('index.html','')+'info.html').then(r=>r.text()).then(html=>{document.getElementById('infoContent').innerHTML=html;});
}

function openPopup(feature,coord){
 lastClickedFeature=feature;
 let overlay=map.getOverlays().getArray()[0]; let content=document.getElementById('popup-content'); if(!overlay||!content) return;
 content.innerHTML=''; overlay.setPosition(undefined);
 let props=feature.getProperties(); let plaats=props.plaats||''; let gebouw=props.gebouw||props.kerknaam||''; let titel=props.titel||'';
 let kop=(plaats&&gebouw)?plaats+', '+gebouw:(plaats&&titel)?plaats+', '+titel:(plaats||gebouw||titel||'locatie');
 let html=`<div style="font-size:18px;font-weight:bold;margin-bottom:10px;">${kop}</div>`;
 for(let key in props){ if(['geometry','id','plaats','gebouw','kerknaam','titel'].includes(key)) continue; let val=props[key]; if(val==null||val===''||val==='null') continue;
   if(key==='link'||key==='bestand'){ html+=`<div style="margin:6px 0;"><a href="${val}" target="_blank"><u>link naar informatie</u></a></div><div id="extra-links-${val}" style="margin-top:6px;"><a href="#" onclick="showLinks(${val}); return false;"><u>nog meer informatie</u></a></div>`; continue; }
   if(key==='link_id'){
   html += `<div style="margin:6px 0;"><a href="#" onclick="showLinks(${val}); return false;"><u>link naar informatie</u></a></div>`;
   html += `<div id="extra-links-${val}" style="margin-top:6px;"><a href="#" onclick="showLinks(${val}); return false;"><u>nog meer informatie</u></a></div>`;
   continue;
 }
   html+=`<div style="margin-top:4px;">${val}</div>`;
 }
 content.innerHTML=html; overlay.setPosition(coord); addShareButtonToPopup();
}

function showLinks(linkId){
 fetch(window.location.pathname.replace('index.html','')+'links.json')
 .then(r=>r.json())
 .then(data=>{
   const rows = data[String(linkId)] || [];
   const target = document.getElementById('extra-links-'+linkId);
   if(!target) return;
   let html='';
   rows.forEach(item=>{
     const cleanUrl = String(item.url||'').replace(/"/g,'');
     html += '<div style="margin-top:4px;"><a href="'+cleanUrl+'" target="_blank">'+item.titel+'</a></div>';
   });
   target.innerHTML = '<a href="#" onclick="showLinks('+linkId+'); return false;"><u>nog meer informatie</u></a>' + html;
 });
}

function addShareButtonToPopup(){ let popup=document.getElementById('popup-content'); if(!popup||!lastClickedFeature) return; if(popup.querySelector('.share-btn')) return; let id=lastClickedFeature.get('id'); if(!id) return; let btn=document.createElement('button'); btn.className='share-btn'; btn.innerText='🔗 deel deze locatie'; btn.style.cssText='margin-top:12px;padding:6px 10px;cursor:pointer'; btn.onclick=function(){ let url=window.location.origin+window.location.pathname+'?id='+id; navigator.clipboard.writeText(url).then(()=>alert('Link staat op klembord')).catch(()=>alert(url));}; popup.appendChild(btn); }
