import { createEl } from "../../tools.js"
import spawnProfile from "./Components/spawnProfile.js"
import { getUsername } from "../../tools.js"

export default function profileView(){
    const section = createEl("section", "", "profileSection")

    section.append(createEl("h1", "Profile", "header"))

    getUsername().then(username => {
        section.append(spawnProfile(username))
    })
    

    return section
}