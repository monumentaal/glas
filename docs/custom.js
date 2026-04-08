// ---------- 🔗 helpers ----------
function getParams() {
    return new URLSearchParams(window.location.search);
}

let lastClickedFeature = null;


// ---------- 🚀 hoofd ----------
window.addEventListener("load", function () {

    if (!window.map) {
        setTimeout(arguments.callee, 300);
        return;
    }

    let mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    // ---------- 📦 infoblok ----------
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


    // ---------- 🌍 start / link ----------
    let params = getParams();

    let lat = params.get("lat");
    let lon = params.get("lon");
    let zoom = params.get("zoom");

    function zoomFromLink() {

        if (!window.map) {
            setTimeout(zoomFromLink, 300);
            return;
        }

        if (lat && lon) {

            let coord = ol.proj.fromLonLat([
                parseFloat(lon),
                parseFloat(lat)
            ]);

            map.getView().setCenter(coord);
            map.getView().setZoom(zoom ? parseInt(zoom) : 15);

            // popup openen
            setTimeout(function () {
                map.forEachFeatureAtPixel(
                    map.getPixelFromCoordinate(coord),
                    function (feature) {
                        lastClickedFeature = feature;
                        if (typeof highlightFeature === "function") {
                            highlightFeature(feature);
                        }
                    }
                );
            }, 500);

        } else {
            map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
            map.getView().setZoom(8);
        }
    }

   function zoomFromLink() {

    if (!window.map || !window.layersList) {
        setTimeout(zoomFromLink, 400);
        return;
    }

    if (lat && lon) {

        let targetLonLat = [parseFloat(lon), parseFloat(lat)];
        let targetCoord = ol.proj.fromLonLat(targetLonLat);

        let foundFeature = null;

        // 🔍 zoek feature in alle lagen
        layersList.forEach(function(layer) {

            if (layer.getSource && layer.getSource().getFeatures) {

                let features = layer.getSource().getFeatures();

                features.forEach(function(f) {

                    let geom = f.getGeometry();

                    if (geom && geom.getType() === "Point") {

                        let coord = geom.getCoordinates();
                        let lonlat = ol.proj.toLonLat(coord);

                        let dist = Math.abs(lonlat[0] - targetLonLat[0]) +
                                   Math.abs(lonlat[1] - targetLonLat[1]);

                        if (dist < 0.0005) { // ≈ 50 meter
                            foundFeature = f;
                        }
                    }
                });
            }
        });

        if (foundFeature) {

            let coord = foundFeature.getGeometry().getCoordinates();

            map.getView().setCenter(coord);
            map.getView().setZoom(16);

            lastClickedFeature = foundFeature;

            // 💬 popup openen
            setTimeout(function () {
                if (typeof highlightFeature === "function") {
                    highlightFeature(foundFeature);
                }
            }, 300);

        } else {
            // fallback
            map.getView().setCenter(targetCoord);
            map.getView().setZoom(14);
        }

    } else {
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);
    }
}
    

    // ---------- 📍 klik op marker ----------
    map.on("singleclick", function(evt) {

        map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            lastClickedFeature = feature;

            // ⬇️ voeg knop toe in popup (na openen)
            setTimeout(addShareButtonToPopup, 200);
        });

    });

});


// ---------- 🔗 knop in popup ----------
function addShareButtonToPopup() {

    let popup = document.getElementById("popup-content");
    if (!popup || !lastClickedFeature) return;

    // voorkom dubbel
    if (popup.querySelector(".share-btn")) return;

    let btn = document.createElement("button");
    btn.className = "share-btn";
    btn.innerText = "🔗 Deel deze marker";
    btn.style.marginTop = "10px";

    btn.onclick = function () {

        let coord = ol.proj.toLonLat(
            lastClickedFeature.getGeometry().getCoordinates()
        );

        let zoom = map.getView().getZoom();

        let url = window.location.origin + window.location.pathname +
            "?lat=" + coord[1].toFixed(5) +
            "&lon=" + coord[0].toFixed(5) +
            "&zoom=" + Math.round(zoom);

        navigator.clipboard.writeText(url);

        alert("Link gekopieerd!");
    };

    popup.appendChild(btn);
}


// ---------- 🔽 inklappen ----------
document.addEventListener("click", function(e) {

    let header = e.target.closest(".info-header");

    if (header) {
        let content = header.nextElementSibling;

        let open = content.style.display === "block";

        content.style.display = open ? "none" : "block";

        header.innerHTML = (open ? "▶ " : "▼ ") + "Over deze kaart";
    }
});
