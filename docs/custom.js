// ---------- globale variabelen ----------
let lastClickedFeature = null;
let searchResults = [];

// ---------- start ----------
window.addEventListener("load", function () {

    setTimeout(function () {

        // startpositie
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);

        // ---------- infoblok ----------
        if (!document.querySelector(".info-panel")) {

            let div = document.createElement("div");
            div.className = "info-panel";
            div.style.position = "absolute";
            div.style.top = "10px";
            div.style.left = "10px";
            div.style.zIndex = "9999";
            div.style.background = "white";
            div.style.padding = "10px";
            div.style.width = "320px";
            div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

            div.innerHTML = `
                <div class="info-header"><b>monumentaal glas op de kaart</b></div>

                <div class="info-content" style="display:block; margin-top:10px;">
                    <div>Zoek:</div>
                    <input type="text" id="searchBox" placeholder="Zoek..." style="width:100%;padding:6px;">

                    <div id="searchResults" style="margin-top:8px;"></div>

                    <div style="margin-top:8px;">
                        Klik op een marker voor informatie.
                    </div>

                    <div style="margin-top:10px;">
                        <button onclick="showInfo()">📘 Toelichting</button>
                    </div>
                </div>
            `;

            document.getElementById("map").appendChild(div);
        }

        // ---------- zoeken ----------
        let searchBox = document.getElementById("searchBox");

        if (searchBox) {
            searchBox.addEventListener("keydown", function (e) {

                if (e.key !== "Enter") return;

                let query = this.value.toLowerCase().trim();
                searchResults = [];

                layersList.forEach(function (layer) {

                    if (!layer.getSource) return;

                    let source = layer.getSource();
                    if (!source.getFeatures) return;

                    source.getFeatures().forEach(function (f) {
                        searchFeature(f, query);

                        if (f.get("features")) {
                            f.get("features").forEach(function(inner) {
                                searchFeature(inner, query);
                            });
                        }
                    });
                });

                showResultsList();

                if (searchResults.length > 0) {
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
                }
            });
        }

        // ---------- klik op marker ----------
        map.on("singleclick", function (evt) {

            let feature = map.forEachFeatureAtPixel(
                evt.pixel,
                function (feature) {
                    return feature;
                },
                { hitTolerance: 10 }
            );

            if (feature) {
                openPopup(feature, evt.coordinate);
            }
        });

    }, 1000);
});

// ---------- zoeken helper ----------
function searchFeature(f, query) {

    let props = f.getProperties();

    for (let key in props) {

        if (key === "geometry") continue;

        let val = props[key];
        if (val === null || val === "" || val === undefined) continue;

        let value = String(val).toLowerCase();

        if (value.includes(query)) {
            searchResults.push(f);
            break;
        }
    }
}

// ---------- resultatenlijst ----------
function showResultsList() {

    let box = document.getElementById("searchResults");
    if (!box) return;

    box.innerHTML = "";

    if (searchResults.length === 0) {
        box.innerHTML = "<i>Geen resultaten</i>";
        return;
    }

    if (searchResults.length === 1) {
        return;
    }

    let html = "<b>Resultaten:</b><br>";

    searchResults.forEach(function (f, i) {

        let naam =
            f.get("plaats") ||
            f.get("gebouw") ||
            f.get("kerknaam") ||
            f.get("titel") ||
            ("Resultaat " + (i + 1));

        html += '<div style="margin:3px 0;">' +
            '<a href="#" onclick="zoomToResult(' + i + '); return false;">' +
            naam +
            '</a></div>';
    });

    box.innerHTML = html;
}

// ---------- zoom naar resultaat ----------
function zoomToResult(i) {

    let f = searchResults[i];
    if (!f) return;

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
}

// ---------- popup ----------
function openPopup(feature, coord) {

    lastClickedFeature = feature;

    let overlay = map.getOverlays().getArray()[0];
    let content = document.getElementById("popup-content");

    if (!overlay || !content) return;

    content.innerHTML = "";
    overlay.setPosition(undefined);

    let props = feature.getProperties();
    let html = "";

    for (let key in props) {

        if (key === "geometry") continue;

        let val = props[key];

        if (val === null || val === "" || val === undefined || val === "null") {
            continue;
        }

        // gewone link
        if (key === "link") {
            html += '<b>Link</b>: <a href="' + val + '" target="_blank">' +
                    val +
                    '</a><br>';
            continue;
        }

        // link_id
        if (key === "link_id") {
            html += '<b>Links</b>: <a href="#" onclick="showLinks(' + val + '); return false;">Bekijk bronnen</a><br>';
            continue;
        }

        html += "<b>" + key + "</b>: " + val + "<br>";
    }

    content.innerHTML = html;
    overlay.setPosition(coord);
}

// ---------- bronnen ----------
function showLinks(id) {

    let content = document.getElementById("popup-content");

    fetch("links.json")
        .then(r => r.json())
        .then(data => {

            if (!data[id]) return;

            if (content.querySelector(".linksBlock")) return;

            let html = '<div class="linksBlock"><hr><b>Bronnen</b><br>';

            data[id].forEach(function(item) {
                html += '<div>🔗 <a href="' + item.url + '" target="_blank">' +
                        item.titel +
                        '</a></div>';
            });

            html += "</div>";

            content.innerHTML += html;
        });
}

// ---------- toelichting ----------
function showInfo() {

    let old = document.getElementById("infoWindow");
    if (old) old.remove();

    let box = document.createElement("div");
    box.id = "infoWindow";

    box.style.position = "fixed";
    box.style.top = "10%";
    box.style.left = "10%";
    box.style.width = "80%";
    box.style.height = "75%";
    box.style.background = "white";
    box.style.border = "1px solid #999";
    box.style.padding = "15px";
    box.style.zIndex = "9999";
    box.style.overflowY = "auto";
    box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

    box.innerHTML = `
        <div style="text-align:right;">
            <button onclick="document.getElementById('infoWindow').remove()">✖ Sluiten</button>
        </div>

        <h2>Toelichting</h2>

        <p>
        De kaart heeft vier lagen die verwijzen naar websites met foto’s en toelichting
        van ramen in een bepaald gebied.
        </p>
    `;

    document.body.appendChild(box);
}

