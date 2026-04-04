// wacht tot alles geladen is
window.addEventListener("load", function () {

    function init() {

        // check of Leaflet bestaat
        if (typeof L === "undefined") {
            console.log("Leaflet nog niet klaar...");
            setTimeout(init, 300);
            return;
        }

        // map vinden
        let mapInstance = null;

        for (let key in window) {
            if (window[key] instanceof L.Map) {
                mapInstance = window[key];
            }
        }

        if (!mapInstance) {
            console.log("Map nog niet gevonden...");
            setTimeout(init, 300);
            return;
        }

        console.log("Map gevonden ✅");

        // startpositie NL
        mapInstance.setView([52.1, 5.1], 8);

        // infoblok toevoegen
        let mapDiv = document.getElementById("map");
        if (!mapDiv) return;

        let div = document.createElement("div");
        div.className = "info-panel";

        div.innerHTML =
            '<div class="info-header"><span class="arrow">▶</span> Over deze kaart</div>' +
            '<div class="info-content">' +
            '<input type="text" id="searchBox" placeholder="Zoek plaats..." />' +
            '<div class="tab-content active">' +
            'Deze kaart toont glas-in-lood ramen.' +
            '</div>' +
            '</div>';

        mapDiv.appendChild(div);
    }

    init();
});


// klikken (inklappen)
document.addEventListener("click", function(e) {
    if (e.target.closest(".info-header")) {
        let header = e.target.closest(".info-header");
        let content = header.nextElementSibling;
        let arrow = header.querySelector(".arrow");

        let open = content.style.display === "block";
        content.style.display = open ? "none" : "block";
        arrow.textContent = open ? "▶" : "▼";
    }
});


// zoeken
document.addEventListener("keydown", function(e) {

    if (e.target.id === "searchBox" && e.key === "Enter") {

        let query = e.target.value;

        fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + query)
            .then(r => r.json())
            .then(data => {

                if (data.length > 0) {
                    let lat = parseFloat(data[0].lat);
                    let lon = parseFloat(data[0].lon);

                    for (let key in window) {
                        if (window[key] instanceof L.Map) {
                            window[key].setView([lat, lon], 13);
                        }
                    }
                }
            });
    }
});
