// 🚀 START als alles geladen is
window.addEventListener("load", function () {

    // 🔍 map vinden (werkt altijd)
    let mapInstance = null;

    for (let key in window) {
        if (window[key] instanceof L.Map) {
            mapInstance = window[key];
        }
    }

    if (!mapInstance) return;

    // 🎯 STARTPOSITIE (NL)
    mapInstance.setView([52.1, 5.1], 8);

    // 📦 infopaneel maken
    let mapDiv = document.getElementById("map");

    if (!mapDiv) return;

    let div = document.createElement("div");
    div.className = "info-panel";

    div.innerHTML =
        '<div class="info-header"><span class="arrow">▶</span> Over deze kaart</div>' +

        '<div class="info-content">' +

        // 🔍 zoekveld
        '<input type="text" id="searchBox" placeholder="Zoek plaats..." />' +

        // tabs
        '<div class="tabs">' +
        '<button class="tab active" data-tab="info">Info</button>' +
        '<button class="tab" data-tab="bron">Bron</button>' +
        '</div>' +

        // inhoud
        '<div class="tab-content active" id="info">' +
        'Deze kaart toont glas-in-lood ramen in Nederland.<br><br>' +
        'Gebruik de legenda om lagen aan/uit te zetten.' +
        '</div>' +

        '<div class="tab-content" id="bron">' +
        'Bronnen:<br>' +
        '- Eigen inventarisatie<br>' +
        '- Monumentenregister' +
        '</div>' +

        '</div>';

    mapDiv.appendChild(div);
});


// 🔽 klikken (inklappen + tabs)
document.addEventListener("click", function(e) {

    // inklappen
    if (e.target.closest(".info-header")) {

        let header = e.target.closest(".info-header");
        let content = header.nextElementSibling;
        let arrow = header.querySelector(".arrow");

        let open = content.style.display === "block";

        content.style.display = open ? "none" : "block";
        arrow.textContent = open ? "▶" : "▼";
    }

    // tabs
    if (e.target.classList.contains("tab")) {

        let tabs = document.querySelectorAll(".tab");
        let contents = document.querySelectorAll(".tab-content");

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        e.target.classList.add("active");
        document.getElementById(e.target.dataset.tab).classList.add("active");
    }
});


// 🔍 ZOEKFUNCTIE (plaats → kaart)
document.addEventListener("keydown", function(e) {

    if (e.target.id === "searchBox" && e.key === "Enter") {

        let query = e.target.value;

        fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + query)
            .then(response => response.json())
            .then(data => {

                if (data.length > 0) {

                    let lat = parseFloat(data[0].lat);
                    let lon = parseFloat(data[0].lon);

                    for (let key in window) {
                        if (window[key] instanceof L.Map) {
                            window[key].setView([lat, lon], 13);
                        }
                    }

                } else {
                    alert("Plaats niet gevonden");
                }
            });
    }
});

