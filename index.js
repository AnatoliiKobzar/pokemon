const refs = {
  form: document.querySelector('.js-form'),
  container: document.querySelector('.js-container'),
  btnPrev: document.querySelector('.js-btn-previous'),
  btnNext: document.querySelector('.js-btn-next'),
  btnRandom: document.querySelector('.js-btn-random'),
};

refs.form.addEventListener('submit', onSearchPokemon);
refs.btnPrev.addEventListener('click', onBtnPrevClick);
refs.btnNext.addEventListener('click', onBtnNextClick);
refs.btnRandom.addEventListener('click', onBtnRandomClick);

let searchQuery = '';

function onSearchPokemon(event) {
  event.preventDefault();
  searchQuery = Number(event.currentTarget.elements.pokemonId.value);
  getPokemon();
  refs.form.reset();
  refs.form.elements.pokemonId.value = searchQuery;
}

function getPokemon() {
  fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
  refs.btnPrev.removeAttribute('disabled');
  refs.btnNext.removeAttribute('disabled');
  refs.form.elements.pokemonId.value = searchQuery;
  if (searchQuery <= 1) {
    refs.btnPrev.setAttribute('disabled', 'true');
  } else {
    refs.btnPrev.removeAttribute('disabled');
  }
  if (searchQuery >= 649) {
    refs.btnNext.setAttribute('disabled', 'true');
  } else {
    refs.btnNext.removeAttribute('disabled');
  }
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
    <h2 class="card-title">Имя: ${name.toUpperCase()}</h2>
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
  getPokemon();
}

function onBtnNextClick() {
  searchQuery += 1;
  getPokemon();
}

function onBtnRandomClick() {
  searchQuery = Math.floor(Math.random() * (649 - 1 + 1)) + 1;
  getPokemon();
}
