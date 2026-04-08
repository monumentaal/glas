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

    zoomFromLink();


    // ---------- 🔍 zoeken ----------
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
