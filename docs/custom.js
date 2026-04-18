/* ===== popup breder maken (eenmalig toevoegen bovenin custom.js) ===== */
const popupStyle = document.createElement("style");
popupStyle.innerHTML = `
.ol-popup{
    min-width:560px !important;
    max-width:820px !important;
}
#popup-content{
    max-height:600px;
    overflow-y:auto;
    line-height:1.5;
}
`;
document.head.appendChild(popupStyle);




// ---------- globale variabelen ----------
let lastClickedFeature = null;
let searchResults = [];

// ---------- start ----------
window.addEventListener("load", function () {

    setTimeout(function () {

        // startpositie
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);

        setTimeout(function () {
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);
        }, 200);

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
/* ===== vervang showResultsList() ===== */
function showResultsList() {

    let box = document.getElementById("searchResults");
    if (!box) return;

    box.innerHTML = "";

    if (searchResults.length === 0) {
        box.innerHTML = "<i>Geen resultaten</i>";
        return;
    }

    /* alfabetisch sorteren op plaats + gebouw */
    searchResults.sort(function(a, b) {

        let naamA =
            (a.get("plaats") || "") + " " +
            (a.get("gebouw") || a.get("kerknaam") || a.get("titel") || "");

        let naamB =
            (b.get("plaats") || "") + " " +
            (b.get("gebouw") || b.get("kerknaam") || b.get("titel") || "");

        return naamA.localeCompare(naamB, "nl");
    });

    let html = `
        <div style="
            border:1px solid #ccc;
            background:#fff;
            padding:8px;
            margin-top:8px;
            max-height:340px;
            overflow-y:auto;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:6px;
            ">
                <b>${searchResults.length} resultaten</b>

                <button onclick="
                    document.getElementById('searchResults').innerHTML='';
                ">✖</button>
            </div>
    `;

    searchResults.forEach(function(f, i) {

        let plaats = f.get("plaats") || "";
        let gebouw =
            f.get("gebouw") ||
            f.get("kerknaam") ||
            f.get("titel") ||
            "";

        let tekst = plaats;
        if (gebouw) tekst += ", " + gebouw;

        html += `
            <div style="margin:5px 0;">
                <a href="#"
                   onclick="zoomToResult(${i}); return false;">
                   ${tekst}
                </a>
            </div>
        `;
    });

    html += "</div>";

    box.innerHTML = html;
}


/* ===== controleer / vervang ook zoomToResult() ===== */
function zoomToResult(i) {

    let f = searchResults[i];
    if (!f) return;

    let coord = f.getGeometry().getCoordinates();

    if (coord[0] < 10) {
        coord = ol.proj.fromLonLat(coord);
    }

    map.getView().animate(
        {
            center: coord,
            zoom: 18,
            duration: 500
        },
        function () {
            openPopup(f, coord);
        }
    );
}

// ---------- bronnen ----------
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
        duration: 500
    });

    setTimeout(function () {
        openPopup(f, coord);
    }, 550);
}

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

    box.innerHTML = `
        <div style="text-align:right;">
            <button onclick="document.getElementById('infoWindow').remove()">✖ Sluiten</button>
        </div>
        <div id="infoContent">Laden...</div>
    `;

    document.body.appendChild(box);

    fetch(window.location.pathname.replace("index.html","") + "info.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("infoContent").innerHTML = html;
        });
}
//* ===== nieuwe openPopup() ===== */
function openPopup(feature, coord) {

    lastClickedFeature = feature;

    let overlay = map.getOverlays().getArray()[0];
    let content = document.getElementById("popup-content");

    if (!overlay || !content) return;

    content.innerHTML = "";
    overlay.setPosition(undefined);

    let props = feature.getProperties();

    let plaats = props.plaats || "";
    let gebouw = props.gebouw || props.kerknaam || "";
    let titel  = props.titel || "";

    let kop = "";

    if (plaats && gebouw) {
        kop = plaats + ", " + gebouw;
    } else if (plaats && titel) {
        kop = plaats + ", " + titel;
    } else {
        kop = plaats || gebouw || titel || "locatie";
    }

    let html = `
        <div style="font-size:18px;font-weight:bold;margin-bottom:10px;">
            ${kop}
        </div>
    `;

    for (let key in props) {

        if (
            key === "geometry" ||
            key === "id" ||
            key === "plaats" ||
            key === "gebouw" ||
            key === "kerknaam" ||
            key === "titel"
        ) continue;

        let val = props[key];

        if (val === null || val === "" || val === undefined || val === "null") {
            continue;
        }

        // normaal veld "link"
        if (key === "link") {
            html += `
                <div style="margin:6px 0;">
                    <a href="${val}" target="_blank">
                        <u>link naar informatie</u>
                    </a>
                </div>
            `;
            continue;
        }

        // veld "bestand"
        if (key === "bestand") {
            html += `
                <div style="margin:6px 0;">
                    <a href="${val}" target="_blank">
                        <u>link naar informatie</u>
                    </a>
                </div>
            `;
            continue;
        }

        // link_id
        if (key === "link_id") {
            html += `
                <div style="margin:6px 0;">
                    <a href="#" onclick="showLinks(${val}); return false;">
                        <u>meer informatie</u>
                    </a>
                </div>
            `;
            continue;
        }

        // overige velden
        html += `<div style="margin-top:4px;">${val}</div>`;
    }

    content.innerHTML = html;
    overlay.setPosition(coord);
    addShareButtonToPopup();
}

function addShareButtonToPopup() {

    let popup = document.getElementById("popup-content");
    if (!popup || !lastClickedFeature) return;

    if (popup.querySelector(".share-btn")) return;

    let id = lastClickedFeature.get("id");
    if (!id) return;

    let btn = document.createElement("button");
    btn.className = "share-btn";
    btn.innerText = "🔗 deel deze locatie";
    btn.style.marginTop = "12px";
    btn.style.padding = "6px 10px";
    btn.style.cursor = "pointer";

    btn.onclick = function () {

        let url =
            window.location.origin +
            window.location.pathname +
            "?id=" + id;

        navigator.clipboard.writeText(url)
            .then(() => alert("Link staat op klembord"))
            .catch(() => alert(url));
    };

    popup.appendChild(btn);
}
function selectSearchResult(i) {
    zoomToResult(i);
    return false;
}
