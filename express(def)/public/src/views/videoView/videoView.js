import { createEl } from "../../tools.js"
import spawnSearchBox from "./Components/spawnSearchBox.js"
import spawnVideosSection from './Modules/spawnVideoSection.js'

export default function videoView(){
    const saveTheme = localStorage.getItem("videoTheme")
    const section = createEl("section", "", "videosSection")

    section.append(createEl("h1", "Videos", "header"))

    section.append(spawnSearchBox())

    section.append(createEl("section", "", "previewCardsContainer"))
    section.append(createEl("div", "", "navContainer"))


   if(saveTheme){spawnVideosSection('NASA')} 

    return section
}