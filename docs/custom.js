function waitForMapAndAddControl() {
    if (typeof map !== "undefined") {
        // control toevoegen
        var infoControl = L.control({ position: 'topleft' });

        infoControl.onAdd = function () {
            var div = L.DomUtil.create('div', 'info-panel');

            div.innerHTML = `
                <div class="info-header">ℹ️ Toelichting</div>
                <div class="info-content">
                    Hier jouw uitleg over de kaart.
                </div>
            `;

            L.DomEvent.disableClickPropagation(div);
            return div;
        };

        infoControl.addTo(map);

    } else {
        // opnieuw proberen tot map bestaat
        setTimeout(waitForMapAndAddControl, 200);
    }
}

// starten
waitForMapAndAddControl();


// toggle gedrag
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {
        const content = e.target.nextElementSibling;
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    }
});
