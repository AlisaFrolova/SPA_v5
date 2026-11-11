import { createEl } from "./DOM_tools.js"
import tokenData from "../tokenModule.js"

export function spawnLogoutButton(){
    const authLink = document.querySelector("#authLink") 
    if(authLink) authLink.remove() 
    const form = document.querySelector(".form")
    if(form) form.remove()

    const logoutButton = createEl("button", "Log out", "logoutButton")
    logoutButton.addEventListener("click", () => {
        logout()
    })
    return logoutButton
}
export function logout(){
    tokenData.clearTokens().then(res => {
        if(res) {
            const logoutButton = document.querySelector(".logoutButton")
            if(logoutButton) logoutButton.remove()
            window.location.replace("/")
        }
    })
}