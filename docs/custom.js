// ---------- globale variabelen ----------
let lastClickedFeature = null;

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

                let query = this.value.toLowerCase();

                layersList.forEach(function (layer) {

                    if (!layer.getSource) return;

                    let source = layer.getSource();
                    if (!source.getFeatures) return;

                    source.getFeatures().forEach(function (f) {

                        let props = f.getProperties();

                        for (let key in props) {

                            if (key === "geometry") continue;

                            let value = String(props[key]).toLowerCase();

                            if (value.includes(query)) {

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
                                return;
                            }
                        }
                    });
                });
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

        // gewone link klikbaar
        if (key === "link" && props[key]) {
            html += '<b>Link</b>: <a href="' + props[key] + '" target="_blank">' +
                    props[key] +
                    '</a><br>';
            continue;
        }

        // link_id naar bronnenlijst
        if (key === "link_id" && props[key]) {
            html += '<b>Links</b>: <a href="#" onclick="showLinks(' + props[key] + '); return false;">Bekijk bronnen</a><br>';
            continue;
        }

        html += "<b>" + key + "</b>: " + props[key] + "<br>";
    }

    content.innerHTML = html;
    overlay.setPosition(coord);
}

// ---------- bronnenlijst ----------
function showLinks(id) {

    let content = document.getElementById("popup-content");

    fetch("links.json")
        .then(r => r.json())
        .then(data => {

            if (!data[id]) return;

            let html = "<hr><b>Bronnen</b><br>";

            data[id].forEach(function(item) {
                html += '<div>🔗 <a href="' + item.url + '" target="_blank">' +
                        item.titel +
                        '</a></div>';
            });

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
        van ramen in een bepaald gebied. Dat zijn gebouwen in Oost-Brabant, het gebied
        tussen Maas en Waal, de oostelijke mijnstreek en de Duitse website met gebouwen
        in Limburg. De eerste drie zijn volledig opgenomen.
        </p>

        <p><b>Laag Webpagina’s</b><br>
        Individuele webpagina’s waar gebouwen te vinden zijn met foto’s en/of gegevens
        over monumentaal glas.</p>

        <p><b>Laag Beeldbank RCE</b><br>
        Een eerste selectie van gebouwen waarvan foto’s van monumentaal glas in de
        beeldbank zijn opgenomen.</p>

        <p><b>Laag Kerkfotografie</b><br>
        Een eerste selectie van gebouwen op de website kerkfotografie.nl waarvan uit de
        foto’s blijkt dat er monumentaal glas aanwezig is.</p>

        <p><b>Laag Boeken</b><br>
        Gebouwen waarvan boeken met foto’s en beschrijvingen van monumentaal glas zijn te vinden.</p>

        <p><b>Laag Pers</b><br>
        Gebouwen waarvan actuele berichten over monumentaal glas in kranten, tijdschriften,
        op Facebook of LinkedIn verschenen zijn.</p>

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
