import { createEl } from "./tools/DOM_tools.js"
import { isAdmin } from "./tools/API_tools.js"

export default function spawnAdminMenu(){
    const button = createEl("button", "Admin", "adminMenuButton")
    button.addEventListener("click", () => {
        console.log("hello world")
    }) 
    document.querySelector(".buttonContainer").append(button)
}