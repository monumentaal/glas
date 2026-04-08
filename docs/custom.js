// ---------- 🔗 URL parameters ----------
function getParam(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}


// ---------- 🚀 hoofd ----------
window.addEventListener("load", function () {

    let mapDiv = document.getElementById("map");
    if (!mapDiv) return;

  // ---------- 📍 openen via link ----------
let lat = getParam("lat");
let lon = getParam("lon");
let zoom = getParam("zoom");

if (lat && lon && window.map && window.layersList) {

    let target = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);
    let foundFeature = null;

    // zoek feature in alle lagen
    layersList.forEach(function(layer) {
        if (layer.getSource && layer.getSource().getFeatures) {

            let features = layer.getSource().getFeatures();

            features.forEach(function(f) {
                let geom = f.getGeometry();
                if (geom && geom.getType() === "Point") {

                    let coord = geom.getCoordinates();

                    let dist = ol.sphere.getDistance(
                        ol.proj.toLonLat(coord),
                        [parseFloat(lon), parseFloat(lat)]
                    );

                    // binnen ~50 meter
                    if (dist < 50) {
                        foundFeature = f;
                    }
                }
            });
        }
    });

    if (foundFeature) {

        let coord = foundFeature.getGeometry().getCoordinates();

        map.getView().setCenter(coord);
        map.getView().setZoom(zoom ? parseInt(zoom) : 16);

        // 🔥 popup openen (qgis2web standaard)
        if (typeof highlightFeature === "function") {
            highlightFeature(foundFeature);
        }

    } else {
        // fallback
        map.getView().setCenter(target);
        map.getView().setZoom(zoom ? parseInt(zoom) : 14);
    }
}

    // ---------- 🔍 zoekfunctie ----------
    document.getElementById("searchBox").addEventListener("keydown", function(e) {

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


    // ---------- 🔗 deel-knop ----------
    document.getElementById("copyLinkBtn").addEventListener("click", function() {

        let center = ol.proj.toLonLat(map.getView().getCenter());
        let zoom = map.getView().getZoom();

        let url = window.location.origin + window.location.pathname +
            "?lat=" + center[1].toFixed(5) +
            "&lon=" + center[0].toFixed(5) +
            "&zoom=" + Math.round(zoom);

        navigator.clipboard.writeText(url);

        alert("Link gekopieerd!");
    });


   // ---------- 📍 openen via link (VEILIG) ----------
let lat = getParam("lat");
let lon = getParam("lon");
let zoom = getParam("zoom");

if (lat && lon && window.map) {

    let coord = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);

    map.getView().setCenter(coord);
    map.getView().setZoom(zoom ? parseInt(zoom) : 15);

    // probeer popup te openen (alleen als functie bestaat)
    try {
        if (typeof highlightFeature === "function") {

            map.once("rendercomplete", function () {

                map.forEachFeatureAtPixel(
                    map.getPixelFromCoordinate(coord),
                    function (feature) {
                        highlightFeature(feature);
                    }
                );

            });
        }
    } catch (e) {
        console.log("popup niet gevonden", e);
    }
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
