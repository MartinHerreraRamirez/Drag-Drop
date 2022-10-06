const CARDS =  5;

for (let i = 0; i < CARDS; i++) {
    let id = getRandomId(150)
    searchPokemonById(id)
}

function getRandomId(max){
   return Math.floor(Math.random()*max)+1
}

let dragPokemon = document.querySelector('.drag-pokemon')
let dropPokemon = document.querySelector('.drop-pokemon')

let pokemonSearched = [] 
let pokemonNames = [] 

async function searchPokemonById(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    pokemonSearched.push(data)
    pokemonNames.push(data.name)

    pokemonNames = pokemonNames.sort(() => Math.random()-0.5)

    dragPokemon.innerHTML = ''
    dropPokemon.innerHTML = ''

    pokemonSearched.forEach(pokemon => {
        dragPokemon.innerHTML += `
        <div class="pokemon">
            <img class='image' src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
        </div>`
    })


    pokemonNames.forEach(names => {
        dropPokemon.innerHTML += `
        <div class="name">
            <p>${names}</p>
        </div>`
    })
}




