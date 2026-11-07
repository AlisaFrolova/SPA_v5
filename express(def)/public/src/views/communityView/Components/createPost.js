import { createEl } from "../../../tools.js"
import { shortenDescription } from "../../../tools.js"
import createInfoText from "./createInfoText.js"
import { postMethod } from "../../../tools.js"
import { createLink } from "../../../tools.js"
import { getUser } from "../../../tools.js"

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

    const starButton = createEl("button", `✯${post.stars}`, "button")
    starButton.addEventListener("click", () => {
        if(starButton.classList.contains("starButton")){
            post.stars = parseInt(post.stars)-1
            starButton.classList.remove("starButton")
        }else {
            post.stars = parseInt(post.stars)+1
            starButton.classList.add("starButton")
        }
        starButton.textContent = `✯${post.stars}`
        postMethod({postID: post.id, username: username, stars: post.stars}, "/api/starPost").then(res => {
            console.log(res)
        })
    })
    postCard.append(starButton)

    getUser(username).then(user => {
        if(user.starredPosts.indexOf(post.id) !== -1) {
            starButton.classList.add("starButton")
        }
    }) 

    return postCard
}