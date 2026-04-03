window.addEventListener("load", function () {

    let mapDiv = document.getElementById("map");

    let div = document.createElement("div");
    div.className = "info-panel";

    div.innerHTML =
        '<div class="info-header"><span class="arrow">▶</span> Over deze kaart</div>' +

        '<div class="info-content">' +

 

        '<div class="tab-content active" id="info">' +
        'Deze kaart toont monumentaal glas in Nederland.<br><br>' +
        'klik op een marker bijeen gebouw en er verschijnt in <br> ' +
        'popup met link naar op internet aanwezige informatie<br>' +
        '</div>' 
    
        '<div class="tab-content" id="bron">' +
        'Bronnen:<br>' +
        '- Eigen inventarisatie<br>' +
        '- Monumentenregister' +
        '</div>' +

        '</div>';

    mapDiv.appendChild(div);
});


// 🔽 inklappen + pijltje draaien
document.addEventListener("click", function(e) {

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
