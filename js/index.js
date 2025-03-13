let map;

// Se asegura de que Google Maps inicializa correctamente
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 19.4326, lng: -99.1332 }, // Ubicación inicial: CDMX
    });
}

document.getElementById("getLocation").addEventListener("click", () => {
    const status = document.getElementById("status");
    const mapDiv = document.getElementById("map");

    if (!map) {
        status.textContent = "El mapa aún no ha cargado. Intenta nuevamente.";
        return;
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                status.textContent = `Ubicación obtenida: Lat ${latitude}, Lng ${longitude}`;
                
                // Mostrar el mapa
                mapDiv.style.display = "block";

                // Ubicación del usuario
                const userLocation = { lat: latitude, lng: longitude };
                map.setCenter(userLocation);

                // Agregar marcador en la ubicación
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "¡Aquí estás!",
                });
            },
            (error) => {
                status.textContent = "No se pudo obtener la ubicación.";
            }
        );
    } else {
        status.textContent = "Tu navegador no soporta la Geolocalización API.";
    }
});
