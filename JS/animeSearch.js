const BASE_API_URL = "https://api.jikan.moe/v4/anime";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.data);
        })
        .catch((error) => {
            console.log(error, "Error al consumir la API");
        });
}

function fillData(results) {
    let cards = "";

    for (let i = 0; i < 20; i++) {
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${results[i].images.jpg.image_url}" class="card-img-top" alt="${results[i].title}">
                    <h2 class="card-title">${results[i].title}</h2>
                    <div class="card-body">
                        <h5 class="card-title">Episodios: ${results[i].episodes || "N/A"}</h5>
                        <a href="${results[i].url}" target="_blank" class="btn btn-primary">Más información</a>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("dataAlbum").innerHTML = cards;
}

// Función para manejar el buscador
function handleSearch() {
    const query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
        const searchUrl = `${BASE_API_URL}?q=${encodeURIComponent(query)}&sfw`;
        getAlbum(searchUrl);
    } else {
        alert("Por favor ingresa un término para buscar.");
    }
}

document.getElementById("searchButton").addEventListener("click", handleSearch);

getAlbum(BASE_API_URL);
