import spawnVideosSection from './Modules/spawnVideoSection.js'
import { createEl } from "../../tools/DOM_tools.js"
import { spawnSearchBox } from "../../tools/DOM_tools.js"

export default function videoView(){
    const saveTheme = localStorage.getItem("videoTheme")
    const section = createEl("section", "", "videosSection")

    section.append(createEl("h1", "Videos", "header"))

    section.append(spawnSearchBox(() => {
        localStorage.setItem("pageNumber", 1)
        localStorage.setItem("videoTheme", searchInput.value)
        spawnVideosSection()
    }))

    section.append(createEl("section", "", "previewCardsContainer"))
    section.append(createEl("div", "", "navContainer"))


   if(saveTheme){spawnVideosSection('NASA')} 

    return section
}