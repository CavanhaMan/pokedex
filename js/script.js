//fazendo acesso assincrono a API (usando await para aguardar a resposta)
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    console.log(APIResponse);

    //acessando os dados json da consulta API:
    const data = await APIResponse.json();
    console.log(data);
  
}

fetchPokemon('25');