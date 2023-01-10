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
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(response => response.json());
}

function renderPokemonCard(pokemon) {
  const {
    sprites: {
      other: {
        dream_world: { front_default },
      },
    },
    name,
    height,
    weight,
  } = pokemon;

  const abilities = rf;
  const markup = `<div class="card">
  <div class="card-img-top">
    <img src="${front_default}" alt="${name}">
  </div>
  <div class="card-body">
    <h2 class="card-title">Имя: ${name}</h2>
    <p class="card-text">Вес: ${(weight * 0.1).toFixed(1)} кг</p>
    <p class="card-text">Рост: ${(height * 0.1).toFixed(1)} м</p>

    <p class="card-text"><b>Умения</b></p>
    <ul class="list-group"></ul>
      <li class="list-group-item">{{ability.name}}</li>
    </ul>
  </div>
</div>`;

  refs.container.innerHTML = markup;
}
