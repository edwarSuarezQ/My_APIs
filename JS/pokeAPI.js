const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results);
            pagination(json);
        })
        .catch((error) => {
            console.log(error, "Error al consumir la API");
        });
}

function fillData(results) {
    let cards = "";

    for (let i = 0; i < results.length; i++) {
        fetch(results[i].url)
            .then((response) => response.json())
            .then((details) => {
                cards += `
                <div class="col">
                    <div class="card h-100" style="width: 12rem;">
                        <img src="${details.sprites.front_default}" class="card-img-top" alt="${details.name}">
                        <h2 class="card-title">${details.name}</h2>
                        <div class="card-body">
                            <h5 class="card-title">Type: ${details.types.map(t => t.type.name).join(", ")}</h5>
                            <h5 class="card-title">Base Experience: ${details.base_experience}</h5>
                            <h5 class="card-title">Species: ${details.species.name}</h5>
                            <h5 class="card-title">Special Attack: ${details.stats.find(stat => stat.stat.name === "special-attack").base_stat}</h5>
                        </div>
                    </div>
                </div>
                `;
                document.getElementById("dataAlbum").innerHTML = cards;
            })
            .catch((error) => console.log(error));
    }
}

function pagination(info) {
    let prevDisabled = "";
    let nextDisabled = "";

    if (info.previous === null) {
        prevDisabled = "disabled";
    } else {
        prevDisabled = "";
    }

    if (info.next === null) {
        nextDisabled = "disabled";
    } else {
        nextDisabled = "";
    }

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${info.previous}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${info.next}')">Next</a>
        </li>
    `;
    document.getElementById("pagination").innerHTML = html;
}

getAlbum(API_POKEMON);