import { createEl } from "./tools.js"
import { createLink } from "./tools.js"

export default function spawnHeader(){
    const header = createEl("header", "", "header")

    const logo = createLink("", "/")
    logo.classList.add("logo")
    header.append(logo)

    const mainNav = createEl("nav", "", "mainNav")
    mainNav.append(createLink("Home", "/"))
    mainNav.append(createLink("Space", "/space"))
    mainNav.append(createLink("News", "/news"))
    mainNav.append(createLink("Videos", "/video"))
    mainNav.append(createLink("Community", "/community"))
    mainNav.append(createLink("Profile", "/profile"))
    header.append(mainNav)

    return header
}