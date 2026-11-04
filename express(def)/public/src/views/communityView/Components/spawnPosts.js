import { createEl } from "../../../tools.js"
import { shortenDescription } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"
import createInfoText from "./createInfoText.js"
import { getUsername } from "../../../tools.js"
import tokenData from "../../../tokenModule.js"


let username = ""

export default function spawnPosts(container){
    getUsername().then(res => { 
        username = res
        for (const el of getValueFromLocalStorage("posts")) {
            container.append(createPost(el.author, el.date, el.title, el.description, el.id))
        }
    })
}

function createPost(author, date, title, description, id){ //^^ the name of this func is the same as module's name
    const post = createEl("div", "", "post")

    if(username === author){ 
        post.append(createEl("p", "Your Post", "postMark"))
        
        const updateLink = createEl("a", "Update", "link")//^^ again, the name of class doesnt suit the el (needs to ba changed everywhere to just BUTTON)
        updateLink.href = "/community/update" //-> to tools, because it was already used in many places
        updateLink.setAttribute("data-link", "")
        updateLink.addEventListener("click", () => {
            localStorage.setItem("articleID", id)
        })
        post.append(updateLink)

        const deleteButton = createEl("button", "Delete", "confirmButton")
        deleteButton.addEventListener("click", () => {
            deletePost(id).then(res => {
                if(res){
                    post.remove()
                }else{
                    const message = createEl("p", "", "message")
                    message.textContent = "Post wasn't deleted, smth went wrong"
                    post.append(message)
                }
            })
        })
        post.append(deleteButton)
    }

    post.append(createEl("h2", title, "postTitle"))

    const postInfoContainer = createEl("div", "", "postInfoContainer")
    postInfoContainer.append(createInfoText("User", author))
    postInfoContainer.append(createInfoText("Date", date))
    postInfoContainer.append(createInfoText("ID", id))
    post.append(postInfoContainer)

    post.append(createEl("p", shortenDescription(description), "postDescription"))

    const postLink = createEl("a", "View full post ...", "postLink")
    postLink.href = "/community/post"
    postLink.setAttribute("data-link", "")
    postLink.addEventListener("click", () => {
        localStorage.setItem("articleID", id)
    })
    post.append(postLink)

    return post
}

function deletePost(id){
    return tokenData.refreshAccessToken().then(() => {
        return fetch("/api/deletePost", {   
        method: "POST",
        headers: { "Content-Type": "application/json", 
                    "authorization": `Bearer ${tokenData.getAccessToken()}` },
        body: JSON.stringify({postID: id})
        }).then(res => {
             if(res.status === 200){
                return true
             }else{
                return tokenData.refreshAccessToken().then(res => {
                    if(res) return deletePost(id)
                        else return false
                })
            }
        })
    })
}