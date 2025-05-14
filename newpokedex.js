function Pokedex() {
    this.contenedorPokemon = document.createElement('div');
    this.contenedorPokemon.classList.add('contenedorPokemon');
    document.querySelector('.contenedor').appendChild(this.contenedorPokemon);

    this.botonPokedex = document.querySelector('.centro-button');
    this.botonPagina = null;
    this.offset = 0;

    this.fetchPokemon = function (id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then((data) => {
                this.crearPokemon(data);
            });
    };

    this.fetchPokemons = function (number, offset) {
        for (let i = 1 + offset; i <= number + offset; i++) {
            setTimeout(() => {
                this.fetchPokemon(i);
            }, 500 * (i - offset - 1));
        }
    };

    this.crearPokemon = function (pokemon) {
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

    this.init = function () {
        this.botonPokedex.addEventListener('click', () => {

            this.contenedorPokemon.innerHTML = '';
            this.offset = 0;

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

        if (this.botonPagina) {
            this.botonPagina.style.display = 'none';
        }
    };
}

const miPokedex = new Pokedex();
miPokedex.init();