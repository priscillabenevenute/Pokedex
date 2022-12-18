const pokemonNome = document.querySelector ('.pokemon_nome');
const pokemonNumero = document.querySelector ('.pokemon_numero');
const pokemonGif = document.querySelector ('.pokemon_imagem');
const formularioPokemon = document.querySelector ('.formulario');
const procurarPokemon = document.querySelector ('.input_search');
const botaoVoltar = document.querySelector ('.btn-voltar');
const botaoProximo = document.querySelector ('.btn-proximo');

let passarPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const rendenizarPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Procurando...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        procurarPokemon.value = '';
        passarPokemon = data.id;
    } else {
        pokemonGif.style.display = 'none';
        pokemonNome.innerHTML = 'Não achamos!😥';
        pokemonNumero.innerHTML = '';
    }
}

formularioPokemon.addEventListener('submit', (event) => {
    event.preventDefault();
    rendenizarPokemon(procurarPokemon.value.toLowerCase());
    
  });

botaoVoltar.addEventListener('click', () => {
    if (passarPokemon > 1) {
    passarPokemon -= 1;
    rendenizarPokemon(passarPokemon);
    }
  });

botaoProximo.addEventListener('click', () => {
    passarPokemon += 1;
    rendenizarPokemon(passarPokemon);
  });

rendenizarPokemon(passarPokemon);
  