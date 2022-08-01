const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


//fazendo acesso assincrono a API (usando await para aguardar a resposta)
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    console.log(APIResponse);

    //acessando os dados json da consulta API:
    const data = await APIResponse.json();

    console.log(data);
    console.log("Nome do pokemon: "+data.name);
    console.log("Numero do pokemon: "+data.id);
    console.log("Tipo do pokemon: "+ data['types']['0']['type']['name']);
    console.log("Ataques: "+ data['moves']['0']['move']['name']
    + ", " + data['moves']['1']['move']['name']);

    return data;

}

//fetchPokemon('25');

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
  
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      searchPokemon = data.id;
    } else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Não encontrado no pokedex!';
      pokemonNumber.innerHTML = '';
    }
  }
  
  renderPokemon('300');
  renderPokemon('charizard');
