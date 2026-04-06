// wacht tot pagina klaar is

console.log("CUSTOM WORDT GELADEN");
alert("CUSTOM ACTIEF");

window.addEventListener("load", function () {

    function addPanel() {

        let mapDiv = document.getElementById("map");

        if (!mapDiv) {
            setTimeout(addPanel, 300);
            return;
        }

        // voorkom dubbel
        if (document.querySelector(".info-panel")) return;

        let div = document.createElement("div");
        div.className = "info-panel";

        div.innerHTML =
            '<div class="info-header">▶ Over deze kaart</div>' +
            '<div class="info-content">' +
            'zoek op plaats'+
            '<input type="text" id="searchBox" placeholder="Zoek plaats..." />' +
            'Klik op een marker dan komt een popup met een link '+
            'naar informatie <br><br>' +
           
            '</div>';

        mapDiv.appendChild(div);

        console.log("infoblok geplaatst ✅");
    }

    addPanel();
});


// inklappen
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {

        let header = e.target;
        let content = header.nextElementSibling;

        let open = content.style.display === "block";

        content.style.display = open ? "none" : "block";
        header.textContent = (open ? "▶ " : "▼ ") + "Over deze kaart";
    }
});

document.addEventListener("keydown", function(e) {

    if (e.target.id === "searchBox" && e.key === "Enter") {

        let query = e.target.value;

        fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + query)
            .then(r => r.json())
            .then(data => {

                if (data.length > 0) {

                    let lat = parseFloat(data[0].lat);
                    let lon = parseFloat(data[0].lon);

                    // OpenLayers kaart (jouw geval!)
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
