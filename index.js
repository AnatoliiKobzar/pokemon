const refs = {
  form: document.querySelector('.js-form'),
  container: document.querySelector('.js-container'),
  btnPrev: document.querySelector('.js-btn-previous'),
  btnNext: document.querySelector('.js-btn-next'),
};

refs.form.addEventListener('submit', onSearchPokemon);
refs.btnPrev.addEventListener('click', onBtnPrevClick);
refs.btnNext.addEventListener('click', onBtnNextClick);

let searchQuery = '';

function onSearchPokemon(event) {
  event.preventDefault();
  searchQuery = Number(event.currentTarget.elements.pokemonId.value);
  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
  refs.form.reset();
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
    abilities,
    name,
    height,
    weight,
  } = pokemon;

  const markupAbilities = abilities
    .map(({ ability: { name } }) => `<li class="list-group-item">${name}</li>`)
    .join('');

  const markup = `<div class="card">
  <div class="card-img-top">
    <img src="${front_default}" alt="${name}">
  </div>
  <div class="card-body">
    <h2 class="card-title">Имя: ${name}</h2>
    <p class="card-text">Вес: ${(weight * 0.1).toFixed(1)} кг</p>
    <p class="card-text">Рост: ${(height * 0.1).toFixed(1)} м</p>

    <p class="card-text"><b>Умения</b></p>
    <ul class="list-group">
     ${markupAbilities}
    </ul>
  </div>
</div>`;

  refs.container.innerHTML = markup;
}

function onBtnPrevClick() {
  searchQuery -= 1;
  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}

function onBtnNextClick() {
  searchQuery += 1;
  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}
