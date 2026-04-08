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

                let query = this.value;

                fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + query + ", Netherlands")
                    .then(r => r.json())
                    .then(data => {

                        if (data.length > 0) {

                            let lat = parseFloat(data[0].lat);
                            let lon = parseFloat(data[0].lon);

                            map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
                            map.getView().setZoom(13);

                        } else {
                            alert("Plaats niet gevonden");
                        }
                    });
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

    // ---------- openen via ID ----------
    openFromId();

});


// ---------- openen via ID + layer ----------
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

    // alleen vector layers hebben features
    if (!source.getFeatures) return;

    let features = source.getFeatures();

    if (features.includes(lastClickedFeature)) {
        layerName = layer.get("title");
    }

});

                layer.getSource().getFeatures().forEach(function(f) {

                    if (f.get("id") == id) {
                        found = f;
                    }

                });
            }
        });

        if (found) {

            let coord = found.getGeometry().getCoordinates();

            map.getView().setCenter(coord);
            map.getView().setZoom(16);

            lastClickedFeature = found;

// simulate click via pixel
let pixel = map.getPixelFromCoordinate(coord);

map.forEachFeatureAtPixel(pixel, function(feature) {
    if (feature === found) {
        // trigger normale popup flow
        map.dispatchEvent({
            type: "singleclick",
            coordinate: coord,
            pixel: pixel
        });
    }
});

// share knop opnieuw toevoegen
setTimeout(addShareButtonToPopup, 300);

        } else {
            setTimeout(findFeature, 300);
        }
    }

    findFeature();
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

        // laag bepalen
        let layerName = "";

        layersList.forEach(function(layer) {
            let features = layer.getSource().getFeatures();
            if (features.includes(lastClickedFeature)) {
                layerName = layer.get("title");
            }
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
