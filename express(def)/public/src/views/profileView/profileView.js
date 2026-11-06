import { createEl } from "../../tools.js"
import spawnProfile from "./Components/spawnProfile.js"
import { spawnSearchBox } from "../../tools.js"
import { getUsername } from "../../tools.js"

export default function profileView(){
    const section = createEl("section", "", "profileSection")

    section.append(createEl("h1", "Profile", "header"))

    section.append(spawnSearchBox(() => {
        const profile = document.querySelector(".profile")
        if(profile) profile.remove()

        const text = document.querySelector(".profileText")
        if(text) text.textContent = `${searchInput.value} profile:`
        section.append(spawnProfile(searchInput.value))
    }))

    section.append(createEl("p", "Your profile:", "profileText"))

    getUsername().then(res => {
        section.append(spawnProfile(res))
    })

    return section
}