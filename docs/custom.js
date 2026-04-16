let lastClickedFeature = null;

window.addEventListener("load", function () {

    setTimeout(function () {

        // startpositie
        map.getView().setCenter(ol.proj.fromLonLat([5.4, 52.15]));
        map.getView().setZoom(8);

        // infoblok
        if (!document.querySelector(".info-panel")) {
            let div = document.createElement("div");
            div.className = "info-panel";
            div.style.position = "absolute";
            div.style.top = "10px";
            div.style.left = "10px";
            div.style.zIndex = "9999";
            div.style.background = "white";
            div.style.padding = "10px";
            div.style.width = "320px";
            div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

            div.innerHTML = `
                <div class="info-header"><b>monumentaal glas op de kaart</b></div>

                <div class="info-content" style="display:block; margin-top:10px;">
                    <div>Zoek:</div>
                    <input type="text" id="searchBox" placeholder="Zoek..." style="width:100%;padding:6px;">

                    <div style="margin-top:8px;">
                        Klik op een marker voor informatie.
                    </div>

                    <div style="margin-top:10px;">
                        <button onclick="showInfo()">📘 Toelichting</button>
                    </div>
                </div>
            `;

            document.getElementById("map").appendChild(div);
        }

        // marker klik
        map.on("singleclick", function (evt) {

            let feature = map.forEachFeatureAtPixel(
                evt.pixel,
                function (feature) { return feature; },
                { hitTolerance: 10 }
            );

            if (feature) {
                openPopup(feature, evt.coordinate);
            }
        });

    }, 1000);
});

function openPopup(feature, coord) {

    lastClickedFeature = feature;

    let overlay = map.getOverlays().getArray()[0];
    let content = document.getElementById("popup-content");

    if (!overlay || !content) return;

    content.innerHTML = "";
    overlay.setPosition(undefined);

    let props = feature.getProperties();
    let html = "";

    for (let key in props) {

        if (key === "geometry") continue;

        if (key === "link_id" && props[key]) {
            html += '<b>Links</b>: <a href="#" onclick="showLinks(' + props[key] + '); return false;">Bekijk bronnen</a><br>';
            continue;
        }

        html += "<b>" + key + "</b>: " + props[key] + "<br>";
    }

    content.innerHTML = html;
    overlay.setPosition(coord);
}

function showLinks(id) {

    let content = document.getElementById("popup-content");

    fetch("links.json")
        .then(r => r.json())
        .then(data => {

            if (!data[id]) return;

            let html = "<hr><b>Bronnen</b><br>";

            data[id].forEach(function(item) {
                html += '<div>🔗 <a href="' + item.url + '" target="_blank">' +
                        item.titel +
                        '</a></div>';
            });

            content.innerHTML += html;
        });
}

function showInfo() {
    alert("Hier komt jouw toelichting terug.");
}
