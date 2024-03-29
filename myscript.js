import { bindPlanetClicks } from './planetClicks.js';
import { typ, namn, namnLatin, rotation, omkrets, tempDag, tempNatt, distans, orb, text, månar } from './dom.js'
bindPlanetClicks(fetchPlanetData);



 


let form = document.getElementById("search-form")



// Här är tomma variablar för API, detta för att minska problem med async funktioner.
let apiKey = ""
let urlBodies = ""


// Här hämtas apinyckeln med hjälp av POST och sparas i variabeln apiKey
let urlKeys = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys`

fetch(urlKeys, {
  method: 'POST',
  headers: {
    'x-zocom': '<solaris-key-here>'
  }
})
.then(response => response.json())
.then(data => {
  apiKey = data.key;

})
.catch((error) => console.error('Error:', error));

// Här skrivs också allting ut i HTML.
// Om något skulle bli fel med hämtandet från APIn så skrivs det ut ett felmeddelande.
function fetchPlanetData(index){
    urlBodies = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies?${apiKey}`
    fetch(urlBodies, {
        method:'GET',
        headers: {
            'x-zocom': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {



typ.textContent = data.bodies[index].type
namn.textContent = data.bodies[index].name
namnLatin.textContent = data.bodies[index].latinName
rotation.textContent = data.bodies[index].rotation
omkrets.textContent = data.bodies[index].circumference
tempDag.textContent = data.bodies[index].temp.day
tempNatt.textContent = data.bodies[index].temp.night
distans.textContent = data.bodies[index].distance
orb.textContent = data.bodies[index].orbitalPeriod
text.textContent = data.bodies[index].desc
månar.textContent = data.bodies[index].moons

})
.catch((error) => {
    console.error('Error:', error);
    window.alert("Ett fel inträffade! Försök igen senare.");
});
}



// Här loopar sökresultatet igenom  objekten i APIn. Alltså bodies-arrayen. Den söker efter namnen på planeterna. 
function findPlanetIndex(searchString, bodies) {
    for (let i = 0; i < bodies.length; i++) {
      // Om namnet på planeten matchar söksträngen, returnera indexet. Det här gäller oavsett om användaren använt stora eller små bokstäver.
      if (bodies[i].name.toLowerCase() === searchString.toLowerCase()) {
        return i;
      }
    }
    // Om ingen matchning hittades, returnera -1. Det här förklaras i nästa del.
    return -1;
  }





  // Här är en eventlistener till sökrutan. Den tar användarens input och söker igenom API(urlBodies)
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let sökInput = document.getElementById("search-input").value;
    let urlBodies = `https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies?${apiKey}`;

    // Här lägger den till så att API-nyckeln fungerar
    fetch(urlBodies, {
        method:'GET',
        headers: {
            'x-zocom': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        // Här skapas variabeln som som använder användarens input och APIn som parametrar.
        let index = findPlanetIndex(sökInput, data.bodies);
        // som lite felhantering så säger den till om ingen matchning hittades i consolen. Alltså om index är -1. -1 är vad som returneras från loopen ovanför om sökresultatet inte hittades.
        if (index === -1) {
            window.alert("Ingen matchning hittades")
        } else {
            fetchPlanetData(index);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        window.alert("Ett fel inträffade! Försök igen senare.");
    });
});