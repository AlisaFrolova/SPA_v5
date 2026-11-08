import { createEl, shortenDescription } from "../../../tools.js"
import createInfoText from "./createInfoText.js"
import createStarButton from "./createStarButton.js"
import spawnUpdateAndDeleteButtons from "./spawnUpdateAndDeleteButtons.js"

export default function createPost(username, post){
    const postCard = createEl("div", "", "post")

    if(username === post.author) spawnUpdateAndDeleteButtons(post.id, postCard)

    postCard.append(createEl("h2", post.title, "postTitle"))

    const postInfoContainer = createEl("div", "", "postInfoContainer")
    postInfoContainer.append(createInfoText("User", post.author))
    postInfoContainer.append(createInfoText("Date", post.date))
    postInfoContainer.append(createInfoText("ID", post.id))
    postCard.append(postInfoContainer)

    postCard.append(createEl("p", shortenDescription(post.description), "postDescription"))

    const postLink = createEl("a", "View full post ...", "postLink")
    postLink.href = "/community/post"
    postLink.setAttribute("data-link", "")
    postLink.addEventListener("click", () => {
        localStorage.setItem("articleID", post.id)
    })
    postCard.append(postLink)

    postCard.append(createStarButton(post))

    return postCard
}