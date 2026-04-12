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
                <div>Zoek:</div>
                <input type="text" id="searchBox" placeholder="Zoek..." />
                <div style="margin-top:8px;">
                    Klik op een marker voor informatie.
                </div>
            </div>
        `;

        mapDiv.appendChild(div);
    }

    // ---------- startpositie ----------
    map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
    map.getView().setZoom(8);

// ---------- zoeken ----------
let searchBox = document.getElementById("searchBox");

if (searchBox) {
    searchBox.addEventListener("keydown", function(e) {

        if (e.key === "Enter") {

            let query = this.value.toLowerCase();
            searchResults = [];

            layersList.forEach(function(layer) {

                if (!layer.getSource) return;

                let source = layer.getSource();
                if (!source.getFeatures) return;

                source.getFeatures().forEach(function(f) {

                    let props = f.getProperties();

                    for (let key in props) {

                        if (key === "geometry" || key === "id" || key === "link") continue;

                        let value = String(props[key]).toLowerCase();

                        if (value.includes(query)) {
                            searchResults.push(f);
                            break;
                        }
                    }

                    if (f.get("features")) {
                        f.get("features").forEach(function(inner) {

                            let props = inner.getProperties();

                            for (let key in props) {

                                if (key === "geometry" || key === "id" || key === "link") continue;

                                let value = String(props[key]).toLowerCase();

                                if (value.includes(query)) {
                                    searchResults.push(inner);
                                    break;
                                }
                            }

                        });
                    }

                });

            });

            if (searchResults.length > 0) {

                showResultsList();

                let f = searchResults[0];
                let coord = f.getGeometry().getCoordinates();

                if (coord[0] < 10) {
                    coord = ol.proj.fromLonLat(coord);
                }

                map.getView().animate({
                    center: coord,
                    zoom: 18,
                    duration: 800
                });

                openPopup(f, coord);

            } else {
                alert("Geen resultaten gevonden");
            }
        }
    });
}
    // ---------- klik op marker ----------
    map.on("singleclick", function(evt) {

        map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            lastClickedFeature = feature;
            setTimeout(addShareButtonToPopup, 200);
        });

    });

    // ---------- openen via URL ----------
    map.once("rendercomplete", function () {
        setTimeout(openFromId, 200);
    });

}); // ✅ INIT CORRECT AFGESLOTEN



// ---------- openen via ID ----------
function openFromId() {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

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

            if (coord[0] < 10) {
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



// ---------- popup ----------
function openPopup(feature, coord) {

    lastClickedFeature = feature;

    let overlay = map.getOverlays().getArray()[0];
    let content = document.getElementById("popup-content");

    if (!overlay || !content) return;

    let props = feature.getProperties();
    let html = "";

    for (let key in props) {

        if (key === "geometry" || key === "trefwoorden") continue;

        html += "<b>" + key + "</b>: " + props[key] + "<br>";
    }

    content.innerHTML = html;
    overlay.setPosition(coord);

    setTimeout(addShareButtonToPopup, 200);
}



// ---------- share knop ----------
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

        let url = window.location.origin + window.location.pathname +
            "?id=" + id;

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
function showResultsList() {

    // oude lijst verwijderen
    let old = document.getElementById("resultsList");
    if (old) old.remove();

    let container = document.createElement("div");
    container.id = "resultsList";
    container.style.marginTop = "10px";
    container.style.maxHeight = "150px";
    container.style.overflowY = "auto";
    container.style.background = "#fff";
    container.style.padding = "5px";

    searchResults.forEach(function(f, index) {

        let props = f.getProperties();

        // kies wat je wilt tonen (naam veld)
      let label = (props.plaats || "") + " - " + (props.gebouw || "");

        let item = document.createElement("div");
        item.innerText = label;
        item.style.cursor = "pointer";
        item.style.padding = "4px";

        item.onclick = function() {

            let coord = f.getGeometry().getCoordinates();

            if (coord[0] < 10) {
                coord = ol.proj.fromLonLat(coord);
            }

            map.getView().animate({
                center: coord,
                zoom: 16,
                duration: 800
            });

            openPopup(f, coord);
        };

        container.appendChild(item);
    });

    document.querySelector(".info-content").appendChild(container);
}
        
