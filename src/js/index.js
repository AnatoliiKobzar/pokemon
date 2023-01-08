import pokemonCardTpl from '../templates/pokemon-card.hbs';

const refs = {
  form: document.querySelector('.js-form'),
  container: document.querySelector('.js-container'),
  btnPrev: document.querySelector('.js-btn-previous'),
  btnNext: document.querySelector('.js-btn-next'),
};

refs.form.addEventListener('submit', onSearchPokemon);

function onSearchPokemon(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.pokemonId.value;

  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}

function fetchPokemon(pokemonId) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
    response => response.json()
  );
}

function renderPokemonCard(pokemon) {
  refs.container.innerHTML = pokemonCardTpl(pokemon);
}
