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
      if (data.id < 650) {//acima de 649 não tem imagens!
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      }
      else
        pokemonImage.src = './img/erro.png'; 

      input.value = '';
      searchPokemon = data.id;
    } else {
      //pokemonImage.style.display = 'none';
      pokemonImage.src = './img/erro.png';
      pokemonName.innerHTML = 'Não encontrado!';
      pokemonNumber.innerHTML = 'xxx';
    }
  }
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  buttonPrev.addEventListener('click', () => {
    searchPokemon -= 1;
    console.log(searchPokemon);
    if (searchPokemon < 1){
      searchPokemon = 898;
    }
    renderPokemon(searchPokemon);
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    console.log(searchPokemon);
    if (searchPokemon > 898) {//acima de 898 não tem nada
      searchPokemon = 1; 
    }
    renderPokemon(searchPokemon);
  });

  renderPokemon('1'); //inicia o pokedex com o primeiro pokemon
  //renderPokemon('charizard');


/*
ACRESCENTANDO LEITURA DAS SETAS DO TECLADO:
seta da esquerda	37	ArrowLeft	ArrowLeft	
seta da direita	39	ArrowRight	ArrowRight  
*/
var btp = document.getElementById("btnprev");
var btn = document.getElementById("btnnext");

//AO PRESSIONAR A SETA, EFETUA O CLIQUE E MUDA APARENCIA
document.onkeydown = pressiona;
function pressiona(e) {
    e = e || window.event;
    if (e.keyCode == '37') {  // <--
      console.log("<-");
      document.getElementById("btnprev").click();
      btp.classList.toggle("clicado");
    }
    else if (e.keyCode == '39') {  //-->
      console.log("->");
      document.getElementById("btnnext").click();
      btn.classList.toggle("clicado");
    }
}
//AO SOLTAR A SETA, VOLTA A APARENCIA
document.onkeyup = solta;
function solta(e) {
  e = e || window.event;
  if (e.keyCode == '37') {  // <--
    console.log("<-");
    btp.classList.toggle("clicado");
  }
  else if (e.keyCode == '39') {  //-->
    console.log("->");
    btn.classList.toggle("clicado");
  }
}
