import { createEl } from "../../../tools.js"
import { shortenDescription } from "../../../tools.js"
import createInfoText from "./createInfoText.js"
import { postMethod } from "../../../tools.js"
import { createLink } from "../../../tools.js"

export default function createPost(username, post){ 
    const postCard = createEl("div", "", "post")

    if(username === post.author){ 
        postCard.append(createEl("p", "Your Post", "postMark"))
        
        const updateLink = createLink("Update", "/community/update")
        updateLink.addEventListener("click", () => {
            localStorage.setItem("articleID", post.id)
        })
        postCard.append(updateLink)

        const deleteButton = createEl("button", "Delete", "button")
        deleteButton.addEventListener("click", () => {
            postMethod({postID: post.id}, "/api/deletePost").then(res => {
                if(res){
                    postCard.remove()
                }else{
                    const message = createEl("p", "", "message")
                    message.textContent = "Post wasn't deleted, smth went wrong"
                    postCard.append(message)
                }
            })
        })
        postCard.append(deleteButton)
    }

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

    return postCard
}