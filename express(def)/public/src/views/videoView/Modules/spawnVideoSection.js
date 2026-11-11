import { getVideos } from "../../../NasaApi.js"
import spawnVideoCards from "../Components/spawnVideoCards.js"
import { createEl, spawnNav } from "../../../tools/DOM_tools.js"

export default function spawnVideosSection(defTheme = '' ){
    let cardsContainer = document.querySelector(".previewCardsContainer")
    if(!cardsContainer) cardsContainer = createEl("section", "", "previewCardsContainer")
    
        cardsContainer.innerHTML = ""

    const loadingText = createEl("p", "Loading videos...", "loadingText")
    cardsContainer.append(loadingText)

    let pageNumber = parseInt(localStorage.getItem("pageNumber"))

    let theme = defTheme ? defTheme :  localStorage.getItem("videoTheme")
    let prevTheme = localStorage.getItem("prevVideoTheme")
    localStorage.setItem("prevVideoTheme", theme)
    if(prevTheme !== theme) pageNumber = 1
    console.log('--blablabla--')
    getVideos(10, theme, pageNumber).then(data => {
        loadingText.remove()
        if(data){
            spawnVideoCards(cardsContainer)
            localStorage.setItem("pageNumber", pageNumber)
            spawnNav(spawnVideosSection)
        }else{
            const errorImg = createEl("img", "", "kernelPanicImg")
            errorImg.src = "../../../../images/kernelPanic.jpg"
            cardsContainer.append(errorImg)
        }
    })
}