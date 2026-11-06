import { createEl } from "./tools.js"

export default function spawnHeader(){
    const header = createEl("header", "", "header")

    const logo = createAnchor("/", "")
    logo.classList.add("logo")
    header.append(logo)

    const mainNav = createEl("nav", "", "mainNav")
    mainNav.append(createAnchor("/", "Home"))
    mainNav.append(createAnchor("/space", "Space"))
    mainNav.append(createAnchor("/news", "News"))
    mainNav.append(createAnchor("/video", "Videos"))
    mainNav.append(createAnchor("/community", "Community"))
    mainNav.append(createAnchor("/profile", "Profile"))
    header.append(mainNav)

    return header
}

function createAnchor(link, text){
    const newAnchor = createEl("a", text, "mainMenuAnchor")
    newAnchor.href = link
    newAnchor.setAttribute("data-link", "")

    return newAnchor
}