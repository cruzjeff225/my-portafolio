/* Seleccionamos los datos a usar*/
const pokemonCard = document.querySelector('[data-pokemon-card]');
const pokemonName = document.querySelector('[data-pokemon-name]');
const pokemonImg = document.querySelector('[data-pokemon-img]');
const pokemonImgContainer = document.querySelector('[data-pokemon-img-container]');
const pokemonId = document.querySelector('[data-pokemon-id]');
const pokemonTypes= document.querySelector('[data-pokemon-types]');
const pokemonStats= document.querySelector('[data-pokemon-stats]');

/* Mapeo de tipos y colores*/
const typeColors ={
    electric: '#D6D452',
    normal:'#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561d25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

/* Funcion para buscar personajes*/
const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

/* Funcion que recibe los datos*/
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;
    
    pokemonName.textContent= data.name;
    pokemonImg.setAttribute('src',sprite);
    pokemonId.textContent = `N° ${data.id}`;  
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

/* Funcion que recibe types y le asigna el color*/
const setCardColor = types => {
    const colorOne= typeColors[types[0].type.name];
    const colorTwo= types[1] ? typeColors[types[1].type.name]: typeColors.default;
    pokemonImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokemonImg.style.backgroundSize = `5px 5px`;
}

/* Funcion que recibe types y setea los datos*/
const renderPokemonTypes = types => {
    pokemonTypes.innerHTML= '';
    types.forEach(type => {
        const typeTextElement= document.createElement("div");
        typeTextElement.style.color= typeColors[type.type.name];
        typeTextElement.textContent= type.type.name;
        pokemonTypes.appendChild(typeTextElement);
    });
}

/* Funcion que recibe stats y mostramos los valores que lleguen*/
const renderPokemonStats = stats => {
    pokemonStats.innerHTML='';
    stats.forEach(stat => {
        const statElement= document.createElement("div");
        const statElementName= document.createElement("div");
        const statElementAmount= document.createElement("div");
        statElementName.textContent= stat.stat.name;
        statElementAmount.textContent= stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}

/* Funcion si el usuario ingresa un valor no registrado en API*/
const renderNotFound = () => {
    pokemonName.textContent='No se encontraron resultados';
    pokemonImg.setAttribute('src','img/NotResult.png');
    pokemonImg.style.background= '#FFF';
    pokemonTypes.innerHTML='';
    pokemonStats.innerHTML='';
    pokemonId.textContent='';

}
