function waitForLeafletUI() {

    let topLeft = document.querySelector(".leaflet-top.leaflet-left");

    if (!topLeft) {
        // blijf proberen tot hij bestaat
        setTimeout(waitForLeafletUI, 300);
        return;
    }

    // voorkom dubbel toevoegen
    if (document.querySelector(".info-panel")) return;

    let div = document.createElement("div");
    div.className = "leaflet-control info-panel";

    div.innerHTML =
        '<div class="info-header">ℹ️ Toelichting</div>' +
        '<div class="info-content">Hier jouw uitleg over de kaart.</div>';

    topLeft.appendChild(div);
}

// start pas NA volledige load
window.addEventListener("load", function () {
    waitForLeafletUI();
});


// toggle
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {
        const content = e.target.nextElementSibling;
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    }
});
