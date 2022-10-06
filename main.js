const IMAGES =  20;


function getRandomId(max){
   return Math.floor(Math.random()*max)+1
}

for (let i = 0; i < IMAGES; i++) {
    let id = getRandomId(150)
    searchPokemonById(id)
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

    pokemonNames = pokemonNames.sort(() => Math.random()-2/5.5-0.75)

    dragPokemon.innerHTML = ''
    dropPokemon.innerHTML = ''

    //Insert the images of pokemons
    pokemonSearched.forEach(pokemon => {
        dragPokemon.innerHTML += `
        <div class="pokemon">
            <img id='${pokemon.name}' draggable='true' class='image' src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
        </div>`
    })

    //Insert the name of pokemons
    pokemonNames.forEach(names => {
        dropPokemon.innerHTML += `
        <div class="name">
            <p>${names}</p>
        </div>`
    })

    let pokemons = document.querySelectorAll('.image')
    pokemons = [...pokemons]

    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.name')
    let wrongMsg = document.querySelector('.wrong')
    let points = 0

    names = [...names]
    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault()
        })

        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text')
            let pokemonElement = document.querySelector(`#${draggableElementData}`)
            if(event.target.innerText == draggableElementData){
                points ++
                event.target.innerHTML = ''
                event.target.appendChild(pokemonElement)
                wrongMsg.innerHTML = '¡Nice Work!'
                if(points == IMAGES){
                    dragPokemon.innerHTML = `<p class='win'>¡CONGRATULATIONS!</p>`
                }
            }else{
                wrongMsg.innerHTML = '¡Fail!'
            }
        })
    })
}




