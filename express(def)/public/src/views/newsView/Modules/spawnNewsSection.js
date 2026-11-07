import { createEl } from "../../../tools.js"
import { getAPOD } from "../../../NasaApi.js"
import spawnNewsCards from "../Components/spawnNewsCards.js"
import spawnSortMenu from "./cardsSortModule.js"
import {spawnNav} from "../../../tools.js"

export default function spawnNewsSection(){
    const cardsContainer = createEl("section", "", "previewCardsContainer")

    const loadingText = createEl("p", "Loading news...", "loadingText")
    cardsContainer.append(loadingText)

    getAPOD("").then(data => {
        localStorage.setItem("pageNumber", 1)
        localStorage.setItem("maxPageNumber", Math.ceil(data.length/10))

        const arrJSON = JSON.stringify(data)
        localStorage.setItem("newsArticles", arrJSON)
        
        loadingText.remove()
        spawnNewsCards()
        cardsContainer.before(spawnSortMenu(cardsContainer))

        const navigation = createEl("div", "", "navContainer")
        cardsContainer.after(navigation)
        spawnNav(spawnNewsCards)
    })

    return cardsContainer
}
