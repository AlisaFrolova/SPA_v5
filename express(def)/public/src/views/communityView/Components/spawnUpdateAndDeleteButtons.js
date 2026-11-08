import { createEl, postMethod, createLink } from "../../../tools.js"

export default function spawnUpdateAndDeleteButtons(postID, postCard){
    postCard.append(createEl("p", "Your Post", "postMark"))
    
    const updateLink = createLink("Update", "/community/update")
    updateLink.addEventListener("click", () => {
        localStorage.setItem("articleID", postID)
    })
    postCard.append(updateLink)

    const deleteButton = createEl("button", "Delete", "button")
    deleteButton.addEventListener("click", () => {
        postMethod({postID: postID}, "/api/deletePost").then(res => {
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