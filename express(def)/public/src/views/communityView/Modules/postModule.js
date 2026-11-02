import { createEl } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"
import createInfoText from "../Components/createInfoText.js"

export default function getPost(){
    const post = getPostById(parseInt(localStorage.getItem("articleID")))
    return spawnPost(post.title, post.author, post.date, post.description, post.id)
}

function spawnPost(title, author, date, description, id){ //-> ^^ (?) -almost the same as the preview version
    const post = createEl("section", "", "fullPost")

    post.append(createEl("h2", title, "header"))

    const infoContainer = createEl("div", "", "postInfoContainer")
    infoContainer.append(createInfoText("User", author))
    infoContainer.append(createInfoText("Date", date))
    infoContainer.append(createInfoText("ID", id))
    post.append(infoContainer)

    post.append(createEl("p", description, "postDescription"))

    const returnLink = createEl("a", "Return to Posts  -->", "link")
    returnLink.href = "/community"
    returnLink.setAttribute("data-link", "")
    post.append(returnLink)

    return post
}

function getPostById(id){
    for (const el of getValueFromLocalStorage("posts")) {
        if(el.id === id){
            return el
        }
    }
}