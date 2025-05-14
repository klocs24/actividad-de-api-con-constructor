const contenedorPokemon = document.querySelector('.contenedorPokemon')

function fetchPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then((data) => {
            // Muestra toda la información del objeto data
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                allData: data // Guarda todo el objeto para mostrarlo
            };
        });
}

function displayPokemon(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <pre>${JSON.stringify(pokemon.allData, null, 2)}</pre>
    `;
    contenedorPokemon.appendChild(pokemonCard);
}

function fetchAndDisplayPokemon(id) {
    fetchPokemon(id)
        .then(pokemon => {
            displayPokemon(pokemon);
        })
        .catch(error => {
            console.error('Error fetching Pokemon:', error);
        });
}

// Mostrar el Pokémon 1 al cargar la página
fetchAndDisplayPokemon(1);