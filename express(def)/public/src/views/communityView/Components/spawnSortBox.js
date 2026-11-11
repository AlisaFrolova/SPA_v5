import { createEl } from "../../../tools/DOM_tools.js"
import { getValueFromLocalStorage } from "../../../tools/DataTools.js"
import getPosts from "./getPosts.js"
import spawnPosts from "./spawnPosts.js"


export default function spawnSortBox(){
    const section = createEl("section", "", "sortContainer")

    section.append(createRangeInput("stars"))
    //section.append(createRangeInput("date")) i hate inputs, maybe 4ever NF

    const submitButton = createEl("button", "Submit", "button")
    submitButton.addEventListener("click", () => {
        const stars = document.querySelector(".starsInput").value
        getPosts().then(() => {
            let posts = getValueFromLocalStorage("posts")
            posts = posts.filter(el => {return el.stars >= stars})
            
            const postsJSON = JSON.stringify(posts)
            localStorage.setItem("posts", postsJSON)
            spawnPosts(document.querySelector(".postsContainer"))
        })
        
    })
    section.append(submitButton)

    return section
}

function findMinAndMax(type){
    const obj = {min: 0, max: 0}
    const posts = getValueFromLocalStorage("posts")
    let tempArr = []
    for (const post of posts) {
        tempArr.push(post[type])
    }
    if(type === "date"){
        tempArr = tempArr.sort((a,b) => a>b)
        obj["min"] = tempArr[0]
        obj["max"] = tempArr[tempArr.length-1]
        console.log(obj)
    }else{
        obj["min"] = Math.min(...tempArr)
        obj["max"] = Math.max(...tempArr)
    }
    return obj
}


function createRangeInput(type){
    const sortBlock = createEl("div", "", "sortBlock")

    const tempInput = createEl("input", "", `${type}Input`)
    tempInput.type = "range"
    tempInput.id = `${type}Input`
    tempInput.name = `${type}Input`

    const minAndMax = findMinAndMax(type)
    tempInput.min = minAndMax["min"]
    tempInput.max = minAndMax["max"]

    sortBlock.append(tempInput)

    const tempLabel = createEl("label", type, `${type}Label`)
    tempLabel.for = `${type}Input`
    sortBlock.append(tempLabel)

    const inputValue = createEl("p", tempInput.value, "accent")
    tempInput.addEventListener("input", () => {
        inputValue.textContent = tempInput.value
    })
    sortBlock.prepend(inputValue)

    return sortBlock
}