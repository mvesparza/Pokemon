window.addEventListener('DOMContentLoaded', (event) => {
    // Desplazar la página a la sección "Hero" al cargar
    window.location.href = "#hero";
  });


document.getElementById('search-button').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    fetchPokemon(search);
});

document.getElementById('search-id-button').addEventListener('click', () => {
    const searchId = document.getElementById('search-id').value;
    fetchPokemon(searchId);
});

document.getElementById('search-type-button').addEventListener('click', () => {
    const type = document.getElementById('pokemon-type').value;
    if (type) {
        fetchPokemonByType(type);
    } else {
        alert('Por favor selecciona un tipo de Pokémon');
    }
});

document.getElementById('search-ability-button').addEventListener('click', () => {
    const ability = document.getElementById('pokemon-ability').value;
    if (ability) {
        fetchPokemonByAbility(ability);
    } else {
        alert('Por favor selecciona una habilidad');
    }
});



document.getElementById('random-button').addEventListener('click', () => {
    const pokemonDiv = document.getElementById('pokemon');
    const errorMessage = document.getElementById('error-message');

    pokemonDiv.innerHTML = '';
    errorMessage.innerText = '';

    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId);
});


document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('pokemon').innerHTML = '';
    document.getElementById('error-message').innerText = '';
    document.getElementById('search').value = '';
    document.getElementById('search-id').value = '';
    document.getElementById('pokemon-type').value = ''; // Corregido aquí
    document.getElementById('pokemon-ability').value = ''; // Corregido aquí
});



// Esta función maneja la respuesta de la búsqueda de Pokémon
function showPokemon(pokemon) {
    const pokemonContainerAbout = document.querySelector('#pokemon-about');

    // Creamos un nuevo elemento de imagen
    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    // Agregamos la imagen al contenedor de Pokémon de la sección "About"
    pokemonContainerAbout.appendChild(image);
}

function fetchPokemon(query) {
    const spinner = document.getElementById('spinner');
    const pokemonDiv = document.getElementById('pokemon');
    const errorMessage = document.getElementById('error-message');

    spinner.style.display = 'block';
    pokemonDiv.innerHTML = '';
    errorMessage.innerText = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            spinner.style.display = 'none';
            pokemonDiv.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
            `;
        })
        .catch(error => {
            spinner.style.display = 'none';
            errorMessage.innerText = error.message;
        });
}

function fetchPokemonByType(type) {
    const spinner = document.getElementById('spinner');
    const pokemonDiv = document.getElementById('pokemon');
    const errorMessage = document.getElementById('error-message');

    spinner.style.display = 'block';
    pokemonDiv.innerHTML = '';
    errorMessage.innerText = '';

    fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Tipo no encontrado');
            }
            return response.json();
        })
        .then(data => {
            spinner.style.display = 'none';
            data.pokemon.forEach(p => {
                fetch(p.pokemon.url)
                    .then(response => response.json())
                    .then(data => {
                        pokemonDiv.innerHTML += `
                            <div>
                                <h2>${data.name}</h2>
                                <img src="${data.sprites.front_default}" alt="${data.name}">
                                <p>Altura: ${data.height}</p>
                                <p>Peso: ${data.weight}</p>
                            </div>
                        `;
                    });
            });
        })
        .catch(error => {
            spinner.style.display = 'none';
            errorMessage.innerText = 'Error al buscar por tipo';
        });
}

function fetchPokemonByAbility(ability) {
    const spinner = document.getElementById('spinner');
    const pokemonDiv = document.getElementById('pokemon');
    const errorMessage = document.getElementById('error-message');

    spinner.style.display = 'block';
    pokemonDiv.innerHTML = '';
    errorMessage.innerText = '';

    fetch(`https://pokeapi.co/api/v2/ability/${ability.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Habilidad no encontrada');
            }
            return response.json();
        })
        .then(data => {
            spinner.style.display = 'none';
            data.pokemon.forEach(p => {
                fetch(p.pokemon.url)
                    .then(response => response.json())
                    .then(data => {
                        pokemonDiv.innerHTML += `
                            <div>
                                <h2>${data.name}</h2>
                                <img src="${data.sprites.front_default}" alt="${data.name}">
                                <p>Altura: ${data.height}</p>
                                <p>Peso: ${data.weight}</p>
                            </div>
                        `;
                    });
            });
        })
        .catch(error => {
            spinner.style.display = 'none';
            errorMessage.innerText = 'Error al buscar por habilidad';
        });
}



