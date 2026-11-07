import { createEl, postMethod } from "../../tools.js"
import spawnProfile from "./Components/spawnProfile.js"
import { spawnSearchBox } from "../../tools.js"
import { getUsername } from "../../tools.js"
import { createLink } from "../../tools.js"
import { logout } from "../../tools.js"

export default function profileView(){
    const section = createEl("section", "", "profileSection")

    section.append(createEl("h1", "Profile", "header"))

    section.append(spawnSearchBox(() => {
        const profile = document.querySelector(".profile")
        if(profile) profile.remove()

        const text = document.querySelector(".profileText")
        if(text) text.textContent = `${searchInput.value} profile:`
        section.append(spawnProfile(searchInput.value))

        const container = document.querySelector(".buttonsContainer")
        if(container) container.remove()
    }))

    section.append(createEl("p", "Your profile:", "profileText"))

    getUsername().then(res => {
        section.append(spawnProfile(res))

        const container = createEl("div", "", "buttonsContainer")
        container.append(createLink("Update Profile", "/profile/update"))
        container.append(createLink("Update Password", "/profile/password"))
        
        const deleteButton = createEl("button", "Delete", "button")
        deleteButton.addEventListener("click", () => {
            postMethod({username: res}, "/api/deleteUser").then(data => {
                if(data){ logout() }
                else{
                    const errorMessage = createEl("p", "User was not deleted", "errorText")
                    container.append(errorMessage)
                }
            })
        })
        container.append(deleteButton)
        section.append(container)
    })

    return section
}