// wacht tot alles geladen is
window.addEventListener("load", function () {

    let mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    // voorkom dubbel
    if (document.querySelector(".info-panel")) return;

    let div = document.createElement("div");
    div.className = "info-panel";

    div.innerHTML = `
        <div class="info-header">▼ Over deze kaart</div>
        <div class="info-content" style="display:block;">
            <div>Zoek op plaats:</div>
            <input type="text" id="searchBox" placeholder="Zoek plaats..." />
            
            <div style="margin-top:8px;">
                Klik op een marker, dan verschijnt een popup met een link naar informatie.
            </div>
        </div>
    `;

    mapDiv.appendChild(div);

    // 🔍 zoekfunctie
    document.getElementById("searchBox").addEventListener("keydown", function(e) {

        if (e.key === "Enter") {

            let query = this.value;

            fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + query)
                .then(r => r.json())
                .then(data => {

                    if (data.length > 0) {

                        let lat = parseFloat(data[0].lat);
                        let lon = parseFloat(data[0].lon);

                        if (window.map) {
                            map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
                            map.getView().setZoom(13);
                        }

                    } else {
                        alert("Plaats niet gevonden");
                    }
                });
        }
    });

    // 🌍 startpositie Nederland
    if (window.map) {
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15));
        map.getView().setZoom(8);
    }
});


// 🔽 inklappen / uitklappen
document.addEventListener("click", function(e) {

    let header = e.target.closest(".info-header");

    if (header) {
        let content = header.nextElementSibling;

        let open = content.style.display === "block";

        content.style.display = open ? "none" : "block";

        header.innerHTML = (open ? "▶ " : "▼ ") + "Over deze kaart";
    }
});
