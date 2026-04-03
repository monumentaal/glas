const observer = new MutationObserver(function () {

    let topLeft = document.querySelector(".leaflet-top.leaflet-left");

    if (topLeft && !document.querySelector(".info-panel")) {

        let div = document.createElement("div");
        div.className = "leaflet-control info-panel";

        div.innerHTML =
            '<div class="info-header">ℹ️ Toelichting</div>' +
            '<div class="info-content">Hier jouw uitleg over de kaart.</div>';

        topLeft.appendChild(div);

        observer.disconnect(); // stop zodra gelukt
    }
});

// kijk naar veranderingen in de pagina
observer.observe(document.body, {
    childList: true,
    subtree: true
});


// toggle
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {
        const content = e.target.nextElementSibling;
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    }
});
