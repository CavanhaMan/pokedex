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
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
    
        console.log(data);
        console.log("Nome do pokemon: "+data.name);
        console.log("Numero do pokemon: "+data.id);
        console.log("Tipo do pokemon: "+ data['types']['0']['type']['name']);
        console.log("Ataques: "+ data['moves']['0']['move']['name']
        + ", " + data['moves']['1']['move']['name']);

        return data;
}
}

//fetchPokemon('25');

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Pesquisando...';
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
      pokemonName.innerHTML = 'Não encontrado!';
      pokemonNumber.innerHTML = '';
    }
  }
  

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
  buttonNext.addEventListener('click', () => {
    if (searchPokemon < 249) { //acima de 249 não tem imagens! criar uma search sem imagem?
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
  });
  


  renderPokemon('1');
  //renderPokemon('charizard');
