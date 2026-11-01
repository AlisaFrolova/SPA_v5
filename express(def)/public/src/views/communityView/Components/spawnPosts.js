import { createEl } from "../../../tools.js"
import { shortenDescription } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"

export default function spawnPosts(container){
    for (const el of getValueFromLocalStorage("posts")) {
        container.append(createPost(el.author, el.date, el.title, el.description))
    }
}

function createPost(author, date, title, description){
    const post = createEl("div", "", "post")

    post.append(createEl("h2", title, "postTitle"))

    const postInfoContainer = createEl("div", "", "postInfoContainer")
    postInfoContainer.append(createInfoText("User", author))
    postInfoContainer.append(createInfoText("Date", date))
    post.append(postInfoContainer)

    post.append(createEl("p", shortenDescription(description), "postDescription"))

    return post
}

function createInfoText(key, value){
    const postInfoText = createEl("p", `${key}: `, "postInfoText")
    postInfoText.append(createEl("span", value, "innerText"))
    return postInfoText
}