document.getElementById("getLocation").addEventListener("click", () => {
    const status = document.getElementById("status");
    const mapDiv = document.getElementById("map");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                status.textContent = `Ubicación obtenida: Lat ${latitude}, Lng ${longitude}`;

                // Mostrar mapa
                mapDiv.style.display = "block";
                const map = L.map("map").setView([latitude, longitude], 15);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors"
                }).addTo(map);

                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup("¡Aquí estás!")
                    .openPopup();
            },
            () => {
                status.textContent = "No se pudo obtener la ubicación.";
            }
        );
    } else {
        status.textContent = "Tu navegador no soporta la Geolocalización API.";
    }
});
