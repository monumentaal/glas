window.addEventListener("load", function () {

    let interval = setInterval(function () {

        let topLeft = document.querySelector(".leaflet-top.leaflet-left");

        if (topLeft) {
            clearInterval(interval);

            let div = document.createElement("div");
            div.className = "leaflet-control info-panel";

            div.innerHTML =
                '<div class="info-header">ℹ️ Toelichting</div>' +
                '<div class="info-content">Dit is een testtekst.</div>';

            topLeft.appendChild(div);
        }

    }, 500);
});


// toggle
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("info-header")) {
        const content = e.target.nextElementSibling;
        content.style.display =
            content.style.display === "none" ? "block" : "none";
    }
});
