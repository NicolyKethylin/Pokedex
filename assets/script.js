const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementById('loadMore');
let offset = 0;
const limit = 10; 

const maxRecords= 151
function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li class="${pokemon.type}">
        <div class="conteudo-titulo">
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number}</span>
        </div>
        <div class="conteudo-effects">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}" srcset="">
        </div>
      </li>
    `).join('');

    if (offset === 0) {
      pokemonList.innerHTML = newHtml;
    } else {
      pokemonList.innerHTML += newHtml;
    }
  });
}

loadButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecord= offset+limit
  if(qtdRecord >=maxRecords){
    const newLimit = maxRecords - qtdRecord
    loadPokemonItems(offset, limit);
    loadButton.parentElement.removeChild(loadButton)
  }else{
  loadPokemonItems(offset, limit);
}
});


loadPokemonItems(offset, limit);