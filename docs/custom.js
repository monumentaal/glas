// ---------- 🔗 helper ----------
function getParam(name) {
    let url = new URL(window.location.href);
    return url.searchParams.get(name);
}


// ---------- 🚀 hoofd ----------
window.addEventListener("load", function () {

    let mapDiv = document.getElementById("map");
    if (!mapDiv || !window.map) return;

    // ---------- 📦 infoblok ----------
    if (!document.querySelector(".info-panel")) {

        let div = document.createElement("div");
        div.className = "info-panel";

        div.innerHTML = `
            <div class="info-header">▼ Over deze kaart</div>
            <div class="info-content" style="display:block;">
                <div>Zoek op plaats:</div>
                <input type="text" id="searchBox" placeholder="Zoek plaats..." />
                
                <button id="copyLinkBtn" style="margin-top:8px;">
                    📋 Deel huidige kaart
                </button>

                <div style="margin-top:8px;">
                    Klik op een marker voor informatie.
                </div>
            </div>
        `;

        mapDiv.appendChild(div);
    }


    // ---------- 🌍 startpositie ----------
   let params = new URLSearchParams(window.location.search);

let lat = params.get("lat");
let lon = params.get("lon");
let zoom = params.get("zoom");

console.log("PARAMS:", lat, lon, zoom);

    if (lat && lon) {

        // 🔗 via link openen
        let coord = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);
        map.getView().setCenter(coord);
        map.getView().setZoom(zoom ? parseInt(zoom) : 15);

        // 🔥 probeer popup (veilig)
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
            console.log("popup niet geopend");
        }

    } else {
        // standaard Nederland
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);
    }


    // ---------- 🔍 zoekfunctie ----------
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


    // ---------- 🔗 deel-knop ----------
    let btn = document.getElementById("copyLinkBtn");

    if (btn) {
        btn.addEventListener("click", function() {

            let center = ol.proj.toLonLat(map.getView().getCenter());
            let zoom = map.getView().getZoom();

            let url = window.location.origin + window.location.pathname +
                "?lat=" + center[1].toFixed(5) +
                "&lon=" + center[0].toFixed(5) +
                "&zoom=" + Math.round(zoom);

            navigator.clipboard.writeText(url);

            alert("Link gekopieerd!");
        });
    }
});
// ---------- 📍 openen via link (WERKT ALTIJD) ----------
(function() {

    let params = new URLSearchParams(window.location.search);

    let lat = params.get("lat");
    let lon = params.get("lon");
    let zoom = params.get("zoom");

    function zoomToLocation() {

        if (!window.map) {
            setTimeout(zoomToLocation, 300);
            return;
        }

        if (lat !== null && lon !== null) {

            let coord = ol.proj.fromLonLat([
                parseFloat(lon),
                parseFloat(lat)
            ]);

            map.getView().setCenter(coord);
            map.getView().setZoom(zoom ? parseInt(zoom) : 15);

            console.log("Zoom toegepast:", lat, lon);
        }
    }

    zoomToLocation();

})();
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
