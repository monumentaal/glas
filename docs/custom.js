
// ---------- globale variabelen ----------
let lastClickedFeature = null;


// ---------- start ----------
window.addEventListener("load", function init() {

    if (!window.map || !window.layersList) {
        setTimeout(init, 300);
        return;
    }

    let mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    // ---------- infoblok ----------
    if (!document.querySelector(".info-panel")) {

        let div = document.createElement("div");
        div.className = "info-panel";

        div.innerHTML = `
            <div class="info-header">▼ Over deze kaart</div>
            <div class="info-content" style="display:block;">
                <div>Zoek op plaats:</div>
                <input type="text" id="searchBox" placeholder="Zoek plaats..." />
                <div style="margin-top:8px;">
                    Klik op een marker voor informatie.
                </div>
            </div>
        `;

        mapDiv.appendChild(div);
    }

    // ---------- standaard start ----------
    map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
    map.getView().setZoom(8);

    // ---------- zoeken ----------
    let searchBox = document.getElementById("searchBox");

    if (searchBox) {
        searchBox.addEventListener("keydown", function(e) {

if (e.key === "Enter") {

    let query = this.value.toLowerCase();

    let results = [];

    layersList.forEach(function(layer) {

        if (!layer.getSource) return;

        let source = layer.getSource();
        if (!source.getFeatures) return;

        source.getFeatures().forEach(function(f) {

            let props = f.getProperties();

            for (let key in props) {

                // ❌ skip geometry, id en link
                if (key === "geometry" || key === "id" || key === "link") continue;

                let value = String(props[key]).toLowerCase();

                if (value.includes(query)) {
                    results.push(f);
                    break;
                }
            }

            // cluster support
            if (f.get("features")) {
                f.get("features").forEach(function(inner) {

                    let props = inner.getProperties();

                    for (let key in props) {

                        if (key === "geometry" || key === "id" || key === "link") continue;

                        let value = String(props[key]).toLowerCase();

                        if (value.includes(query)) {
                            results.push(inner);
                            break;
                        }
                    }

                });
            }

        });

    });

    if (results.length > 0) {

        let f = results[0];

        let coord = f.getGeometry().getCoordinates();

        // jouw projectie fix
        if (coord[0] < 10) {
            coord = ol.proj.fromLonLat(coord);
        }

        map.getView().animate({
            center: coord,
            zoom: 16,
            duration: 800
        });

        openPopup(f, coord);

        alert(results.length + " resultaat(en) gevonden");

    } else {

        alert("Geen resultaten gevonden");
    }
}
            


// ---------- openen via ID ----------
function openFromId() {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let layerName = params.get("layer");

    if (!id) return;

    function findFeature() {

        if (!window.layersList) {
            setTimeout(findFeature, 300);
            return;
        }

        let found = null;

        layersList.forEach(function(layer) {

            if (!layer.getSource) return;

            let source = layer.getSource();
            if (!source.getFeatures) return;

           if (layerName && layer.get("title") !== layerName) return;

            source.getFeatures().forEach(function(f) {

                if (f.get("id") == id) {
                    found = f;
                }

                if (f.get("features")) {
                    f.get("features").forEach(function(inner) {
                        if (inner.get("id") == id) {
                            found = inner;
                        }
                    });
                }

            });

        });

        if (found) {

           
 let coord = found.getGeometry().getCoordinates();

// 🔍 check volgorde (belangrijk!)
if (coord[0] > 90) {
    // waarschijnlijk al EPSG:3857 → niets doen
} else {
    // EPSG:4326 → transformeren
    coord = ol.proj.fromLonLat(coord);
}
            
            map.getView().setCenter(coord);
            map.getView().setZoom(16);

            openPopup(found, coord);

        } else {
            setTimeout(findFeature, 300);
        }
    }

    findFeature();
}



function findFeature() {

    if (!window.layersList) {
        setTimeout(findFeature, 300);
        return;
    }

    let found = null;

    layersList.forEach(function(layer) {

        if (!layer.getSource) return;

        let source = layer.getSource();
        if (!source.getFeatures) return;

        if (layerName && !layer.get("title").includes(layerName)) return;

        source.getFeatures().forEach(function(f) {

            // normale feature
            if (f.get("id") == id) {
                found = f;
            }

            // cluster support
            if (f.get("features")) {
                f.get("features").forEach(function(inner) {
                    if (inner.get("id") == id) {
                        found = inner;
                    }
                });
            }

        });

    });

    if (found) {

        let coord = found.getGeometry().getCoordinates();

        map.getView().setCenter(coord);
        map.getView().setZoom(16);

        openPopup(found, coord);

    } else {
        setTimeout(findFeature, 300);
    }

                        
                        
// popup ophalen
   

    findFeature();
}


function openPopup(feature, coord) {

    lastClickedFeature = feature;

    let overlay = map.getOverlays().getArray()[0];
    let content = document.getElementById("popup-content");
    let container = document.getElementById("popup");

    if (!overlay || !content || !container) {
        console.log("Popup elementen ontbreken");
        return;
    }

    // content vullen
    let props = feature.getProperties();
    let html = "";

    for (let key in props) {

    if (key === "geometry" || key === "trefwoord") {
        continue;
    }

    html += "<b>" + key + "</b>: " + props[key] + "<br>";
}

    content.innerHTML = html;

    // 🔴 BELANGRIJK: popup zichtbaar maken
    container.style.display = "block";

    // positie zetten
    overlay.setPosition(coord);

    // soms nodig: force redraw
    map.render();

    // knop toevoegen
    setTimeout(addShareButtonToPopup, 200);
}

// ---------- knop in popup ----------
function addShareButtonToPopup() {

    let popup = document.getElementById("popup-content");
    if (!popup || !lastClickedFeature) return;

    if (popup.querySelector(".share-btn")) return;

    let btn = document.createElement("button");
    btn.className = "share-btn";
    btn.innerText = "🔗 Deel deze marker";
    btn.style.marginTop = "10px";

    btn.onclick = function () {

        let id = lastClickedFeature.get("id");

        let layerName = "";

        layersList.forEach(function(layer) {

            if (!layer.getSource) return;

            let source = layer.getSource();
            if (!source.getFeatures) return;

            source.getFeatures().forEach(function(f) {

                if (f === lastClickedFeature) {
                    layerName = layer.get("title");
                }

                if (f.get("features") && f.get("features").includes(lastClickedFeature)) {
                    layerName = layer.get("title");
                }

            });

        });

        let url = window.location.origin + window.location.pathname +
            "?id=" + id +
            "&layer=" + encodeURIComponent(layerName);

        navigator.clipboard.writeText(url);

        alert("Link gekopieerd!");
    };

    popup.appendChild(btn);
}


// ---------- inklappen ----------
document.addEventListener("click", function(e) {

    let header = e.target.closest(".info-header");

    if (header) {
        let content = header.nextElementSibling;

        let open = content.style.display === "block";

        content.style.display = open ? "none" : "block";

        header.innerHTML = (open ? "▶ " : "▼ ") + "Over deze kaart";
    }
});
