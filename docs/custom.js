window.addEventListener("load", function () {

    function findMap() {
        for (let key in window) {
            if (window[key] instanceof L.Map) {
                return window[key];
            }
        }
        return null;
    }

    function init() {
        if (typeof L === "undefined") {
            setTimeout(init, 200);
            return;
        }

        let mapInstance = findMap();

        if (!mapInstance) {
            setTimeout(init, 200);
            return;
        }

        var infoControl = L.control({ position: 'topleft' });

        infoControl.onAdd = function () {
            var div = L.DomUtil.create('div', 'info-panel');

            div.innerHTML =
    '<div class="info-header">ℹ️ Toelichting</div>' +
    '<div class="info-content">' +
    'Hier jouw uitleg over de kaart.' +
    '</div>';

            L.DomEvent.disableClickPropagation(div);
            return div;
        };

        infoControl.addTo(mapInstance);
    }

    init();

});


// toggle blijft buiten load
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {
        const content = e.target.nextElementSibling;
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    }
});
