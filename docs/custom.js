// wacht tot pagina klaar is
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
            'Dit is een testtekst.<br><br>' +
            'Hier komt jouw uitleg.' +
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
