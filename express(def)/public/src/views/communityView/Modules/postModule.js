import { createEl } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"
import createInfoText from "../Components/createInfoText.js"
import { createLink } from "../../../tools.js"

export default function getPost(){
    const post = getPostById(localStorage.getItem("articleID"))
    if(post === null) return ""
    return spawnPost(post.title, post.author, post.date, post.description, post.id)
}

function spawnPost(title, author, date, description, id){ //-> ^^ (?) -almost the same as the preview version
    const post = createEl("section", "", "fullPost")

    post.append(createEl("h2", title, "header"))

    const postContainer = createEl("div", "", "postContainer")

    const infoContainer = createEl("div", "", "postInfoContainer")
    infoContainer.append(createInfoText("User", author))
    infoContainer.append(createInfoText("Date", date))
    infoContainer.append(createInfoText("ID", id))
    postContainer.append(infoContainer)

    postContainer.append(createEl("p", description, "postDescription"))

    postContainer.append(createLink("Return to Posts  -->", "/community"))

    post.append(postContainer)

    return post
}

function getPostById(id){
    for (const el of getValueFromLocalStorage("posts")) {
        if(el.id === id){
            return el
        }
    }
    return null
}