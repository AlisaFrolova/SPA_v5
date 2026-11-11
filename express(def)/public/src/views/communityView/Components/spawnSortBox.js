import { createEl } from "../../../tools/DOM_tools.js"
import { getValueFromLocalStorage } from "../../../tools/DataTools.js"
import spawnPosts from "./spawnPosts.js"

export default function spawnSortBox(){//NF
    const section = createEl("section", "", "sortContainer")

    section.append(createRangeInput())

    const submitButton = createEl("button", "Submit", "button")
    submitButton.addEventListener("click", () => {
        const stars = document.querySelector(".starsInput").value

        let posts = getValueFromLocalStorage("posts")
        posts = posts.filter(el => {return el.stars > stars})
        
        const postsJSON = JSON.stringify(posts)
        localStorage.setItem("posts", postsJSON)
        spawnPosts(document.querySelector(".postsContainer"))
    })
    section.append(submitButton)

    return section
}

function createRangeInput(){
    const sortBlock = createEl("div", "", "sortBlock")

    const tempInput = createEl("input", "", "starsInput")
    tempInput.type = "range"
    tempInput.id = "starsInput"
    tempInput.name = "starsInput"
    sortBlock.append(tempInput)

    const tempLabel = createEl("label", "Stars", "starsLabel")
    tempLabel.for = "starsInput"
    sortBlock.append(tempLabel)

    const inputValue = createEl("p", tempInput.value, "accent")
    tempInput.addEventListener("input", () => {
        inputValue.textContent = tempInput.value
    })
    sortBlock.prepend(inputValue)

    return sortBlock
}