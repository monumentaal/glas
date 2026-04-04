// wacht tot DOM klaar is
document.addEventListener("DOMContentLoaded", function () {

    function init() {

        // zoek de kaart div
        let mapDiv = document.getElementById("map");

        if (!mapDiv) {
            setTimeout(init, 300);
            return;
        }

        // voorkom dubbel toevoegen
        if (document.querySelector(".info-panel")) return;

        // 🔽 INFOPANEEL
        let div = document.createElement("div");
        div.className = "info-panel";

        div.innerHTML =
            '<div class="info-header"><span class="arrow">▶</span> Over deze kaart</div>' +
            '<div class="info-content">' +
            '<input type="text" id="searchBox" placeholder="Zoek plaats..." />' +
            '<div>Deze kaart toont glas-in-lood ramen.</div>' +
            '</div>';

        mapDiv.appendChild(div);

        console.log("infoblok toegevoegd ✅");
    }

    init();
});


// 🔽 inklappen
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
