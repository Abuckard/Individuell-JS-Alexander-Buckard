
let solen = document.getElementById("solen")
let merkurius = document.getElementById("merkurius")
let venus = document.getElementById("venus")
let jorden = document.getElementById("jorden")
let mars = document.getElementById("mars")
let jupiter = document.getElementById("jupiter")
let saturnus= document.getElementById("saturnus")
let uranus = document.getElementById("uranus")
let neptunus = document.getElementById("neptunus")

//Modul för alla clickEvents
export function bindPlanetClicks(fetchPlanetData) {
    solen.addEventListener("click", () => {
      fetchPlanetData(0)
    }
    )
    merkurius.addEventListener("click", () => {
        fetchPlanetData(1)
    }
    )
    venus.addEventListener("click", () => {
        fetchPlanetData(2)
    }
    )
    jorden.addEventListener("click", () => {
        fetchPlanetData(3)
    }
    )
    mars.addEventListener("click", () => {
        fetchPlanetData(4)
    }
    )
    jupiter.addEventListener("click", () => {
        fetchPlanetData(5)
    }
    )
    saturnus.addEventListener("click", () => {
        fetchPlanetData(6)
    }
    )
    uranus.addEventListener("click", () => {
        fetchPlanetData(7)
    }
    )
    neptunus.addEventListener("click", () => {
        fetchPlanetData(8)
    }
    )
    }