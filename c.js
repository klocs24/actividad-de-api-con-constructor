function limpiarContenedor() {
    const contenedor = document.querySelector('.contenedor');
    contenedor.innerHTML = '';
    const botonPagina = document.querySelector('.pagina');
    if (botonPagina) {
        botonPagina.style.display = 'none';
    }
}

function PokemonSeccion() {
    this.contenedorPokemon = document.createElement('div');
    this.contenedorPokemon.classList.add('contenedorPokemon');

    this.botonPokedex = document.querySelector('.izquierda-button');
    this.offset = 0;

    this.fetchPokemon = function(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then((data) => {
                this.crearPokemon(data);
            });
    };

    this.fetchPokemons = function() {
        this.fetchPokemon(92);
    };

    const estilosTipos = {
        grass: { background: '#78C850', color: 'white' },
        poison: { background: '#A040A0', color: 'white' },
        fire: { background: '#F08030', color: 'white' },
        water: { background: '#6890F0', color: 'white' },
        bug: { background: '#A8B820', color: 'white' },
        normal: { background: '#A8A878', color: 'black' },
        flying: { background: '#A890F0', color: 'black' },
        electric: { background: '#F8D030', color: 'black' },
        ground: { background: '#E0C068', color: 'black' },
        fairy: { background: '#EE99AC', color: 'black' },
        fighting: { background: '#C03028', color: 'white' },
        psychic: { background: '#F85888', color: 'white' },
        rock: { background: '#B8A038', color: 'white' },
        steel: { background: '#B8B8D0', color: 'black' },
        ice: { background: '#98D8D8', color: 'black' },
        ghost: { background: '#705898', color: 'white' },
        dragon: { background: '#7038F8', color: 'white' },
        dark: { background: '#705848', color: 'white' }
    };

    this.crearPokemon = function(pokemon) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('pokemon-bloque');

        const spriteContenedor = document.createElement('div');
        spriteContenedor.classList.add('sprite-contenedor');

        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.other['official-artwork'].front_default;
        spriteContenedor.appendChild(sprite);

        const number = document.createElement('p');
        number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

        const nombre = document.createElement('p');
        nombre.classList.add('nombre');
        nombre.textContent = pokemon.name;

        const tipos = document.createElement('p');
        tipos.classList.add('tipos');
        for (let i = 0; i < pokemon.types.length; i++) {
            const tipo = pokemon.types[i].type.name;
            const tipoSpan = document.createElement('span');
            tipoSpan.textContent = tipo;

            if (estilosTipos[tipo]) {
                tipoSpan.style.background = estilosTipos[tipo].background;
                tipoSpan.style.color = estilosTipos[tipo].color;
                tipoSpan.style.padding = '4px 10px';
                tipoSpan.style.margin = '0 4px';
                tipoSpan.style.borderRadius = '8px';
                tipoSpan.style.fontWeight = 'bold';
                tipoSpan.style.display = 'inline-block';
                tipoSpan.style.border = '2px solid black';
            }
            tipos.appendChild(tipoSpan);
        }
        const estadisticas = document.createElement('p');
        estadisticas.classList.add('estadisticas');
        estadisticas.textContent = `HP: ${pokemon.stats[0].base_stat} | Ataque: ${pokemon.stats[1].base_stat} | Defensa: ${pokemon.stats[2].base_stat}`;
        estadisticas.style.fontSize = '12px';
        estadisticas.style.color = '#666';
        estadisticas.style.marginTop = '4px';

        tarjeta.appendChild(nombre);
        tarjeta.appendChild(number);
        tarjeta.appendChild(spriteContenedor);
        tarjeta.appendChild(tipos);
        tarjeta.appendChild(estadisticas);
        if (pokemon.types.length === 1) {
            tarjeta.style.background = estilosTipos[pokemon.types[0].type.name].background;
            tarjeta.style.color = estilosTipos[pokemon.types[0].type.name].color;
        } else {
            const color1 = estilosTipos[pokemon.types[0].type.name].background;
            const color2 = estilosTipos[pokemon.types[1].type.name].background;
            tarjeta.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 80%)`;
            tarjeta.style.color = estilosTipos[pokemon.types[0].type.name].color;
        }


        this.contenedorPokemon.appendChild(tarjeta);
    };

    this.init = function() {
        this.botonPokedex.addEventListener('click', () => {
            limpiarContenedor();
            this.contenedorPokemon.innerHTML = '';
            this.offset = 0;
            document.querySelector('.contenedor').appendChild(this.contenedorPokemon);
            this.fetchPokemons();
        });
    };
}

function PokedexSeccion() {
    this.contenedorPokemon = document.createElement('div');
    this.contenedorPokemon.classList.add('contenedorPokemon');

    this.botonPokedex = document.querySelector('.centro-button');
    this.offset = 0;

    this.fetchPokemon = function(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then((data) => {
                this.crearPokemon(data);
            });
    };

    this.fetchPokemons = function(number, offset) {
        for (let i = 1 + offset; i <= number + offset; i++) {
            setTimeout(() => {
                this.fetchPokemon(i);
            }, 500 * (i - offset - 1));
        }
    };

    this.crearPokemon = function(pokemon) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('pokemon-bloque');

        const spriteContenedor = document.createElement('div');
        spriteContenedor.classList.add('sprite-contenedor');
        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.front_default;

        spriteContenedor.appendChild(sprite);

        const number = document.createElement('p');
        number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

        const nombre = document.createElement('p');
        nombre.classList.add('nombre');
        nombre.textContent = pokemon.name;

        tarjeta.appendChild(nombre);
        tarjeta.appendChild(number);
        tarjeta.appendChild(spriteContenedor);

        this.contenedorPokemon.appendChild(tarjeta);
    };

    this.init = function() {
        this.botonPokedex.addEventListener('click', () => {
            limpiarContenedor();
            this.contenedorPokemon.innerHTML = '';
            this.offset = 0;
            document.querySelector('.contenedor').appendChild(this.contenedorPokemon);

            if (!this.botonPagina) {
                this.botonPagina = document.createElement('button');
                this.botonPagina.textContent = 'Más Pokémon';
                this.botonPagina.classList.add('pagina');
                document.querySelector('.contenedor').appendChild(this.botonPagina);

                this.botonPagina.addEventListener('click', () => {
                    this.offset += 9;
                    this.fetchPokemons(9, this.offset);
                });
            }

            this.botonPagina.style.display = 'block';
            this.fetchPokemons(9, this.offset);
        });
    };
}

const miPokedex = new PokedexSeccion();
const miPokemon = new PokemonSeccion();
miPokemon.init();
miPokedex.init();