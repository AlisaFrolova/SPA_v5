import { createEl } from "../../tools.js"
import {getAPOD} from "../../NasaApi.js"
import { getCurrentDay } from "../../tools.js"
import { createLink } from "../../tools.js"

export default function spaceView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "spaceSection")
    app.append(section)

    section.append(createEl("h1", "Space", "header"))

    //APOD
    const APODSection = createEl("section", "", "APODSection")

    getAPOD(getCurrentDay()).then(picture => {
        APODSection.style.backgroundImage = `url(${picture[0].hdurl})`
    })

    section.append(APODSection)

    APODSection.append(createEl("p", "Astronomy Picture of the Day", "textWhite"))
    
    //ASTEROIDS
    const asteroidPreview = createEl("section", "", "asteroidPreview")
    asteroidPreview.append(createEl("p", "Asteroids", "accent"))
    asteroidPreview.append(createEl("p", "Search, filter and read about asteroids", "textWhite"))

    const previewImage = createEl("img", "", "previewImage")
    previewImage.src = "https://images-assets.nasa.gov/image/PIA15789/PIA15789~orig.jpg"
    asteroidPreview.prepend(previewImage)

    asteroidPreview.append(createLink("Read more...", "/space/asteroids"))
    
    section.append(asteroidPreview)

    return section
}