// ---------- globale variabelen ----------
let lastClickedFeature = null;


// ---------- start ----------
function init() {

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
            <div class="info-header">monumentaal glas op de kaart</div>
            <div class="info-content" style="display:block;">
                <div>Zoek:</div>
                <input type="text" id="searchBox" placeholder="Zoek..." />
                <div style="margin-top:8px;">
                    Klik op een marker voor informatie.
                </div>
            </div>

            <div style="margin-top:10px;">
    <button onclick="showInfo()">📘 Toelichting</button>
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

    let feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function(feature) {
            return feature;
        },
        {
            hitTolerance: 10
        }
    );

    if (feature) {
        lastClickedFeature = feature;

        let coord = evt.coordinate;
        openPopup(feature, coord);

        setTimeout(addShareButtonToPopup, 200);
    }
});

    // ---------- openen via URL ----------
    map.once("rendercomplete", function () {
        setTimeout(openFromId, 200);
    });

} // einde init

window.addEventListener("load", init);
function init() {

    if (!window.map || !window.layersList) {
        setTimeout(init, 300);
        return;
    }

    let mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    // jouw bestaande code hier...

}

window.addEventListener("load", init);
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
overlay.setPosition(undefined);
content.innerHTML = "";

    let props = feature.getProperties();
    let html = "";

    for (let key in props) {

        if (key === "geometry" || key === "trefwoorden") continue;

        html += "<b>" + key + "</b>: " + props[key] + "<br>";
    }

    content.innerHTML = html;
    overlay.setPosition(coord);
llet linksId = props.link_id;

if (linksId) {
    fetch("links.json")
        .then(response => response.json())
        .then(data => {

            if (data[linksId]) {

                let linksHtml = "<hr><b>Links</b><br>";

                data[linksId].forEach(function(item) {
                    linksHtml +=
                        '<a href="' + item.url + '" target="_blank">' +
                        item.titel +
                        '</a><br>';
                });

                content.innerHTML += linksHtml;
            }
        });
}
    
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
        van ramen in een bepaald gebied. Dat zijn gebouwen in Oost-Brabant, het gebied
        tussen Maas en Waal, de oostelijke mijnstreek en de Duitse website met gebouwen
        in Limburg. De eerste drie zijn volledig opgenomen.
        </p>

        <p>
        <b>Laag Webpagina’s</b><br>
        Individuele webpagina’s waar gebouwen te vinden zijn met foto’s en/of gegevens
        over monumentaal glas.
        </p>

        <p>
        <b>Laag Beeldbank RCE</b><br>
        Een eerste selectie van gebouwen waarvan foto’s van monumentaal glas in de
        beeldbank zijn opgenomen.
        </p>

        <p>
        <b>Laag Kerkfotografie</b><br>
        Een eerste selectie van gebouwen op de website kerkfotografie.nl waarvan uit de
        foto’s blijkt dat er monumentaal glas aanwezig is.
        </p>

        <p>
        <b>Laag Boeken</b><br>
        Gebouwen waarvan boeken met foto’s en beschrijvingen van monumentaal glas zijn te vinden.
        </p>

        <p>
        <b>Laag Pers</b><br>
        Gebouwen waarvan actuele berichten over monumentaal glas in kranten, tijdschriften,
        op Facebook of LinkedIn verschenen zijn.
        </p>

        <p>
        Iedere laag is met vinkjes in de legenda aan of uit te zetten.
        </p>

        <p>
        Het idee om een kaart te gebruiken om gegevens te presenteren heb ik te danken aan
        Rudolf van der Tak (glazenier) en Bert van Rest (GIS-deskundige).
        </p>
    `;

    document.body.appendChild(box);
}
