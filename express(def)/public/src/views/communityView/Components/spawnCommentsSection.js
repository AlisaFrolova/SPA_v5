import { createEl, createInputBlock, postMethod, getCurrentDay,
     getUsername, getValueFromLocalStorage } from "../../../tools.js"

export default function spawnCommentsSection(){
    const commentsSection = createEl("section", "", "commentsSection")

    commentsSection.append(createEl("p", "Comments", "accent"))

    const commentsContainer = createEl("div", "", "commentsContainer")

    const posts = getValueFromLocalStorage("posts")
    for (let el of posts) {
        if(parseInt(el.id) === parseInt(localStorage.getItem("articleID"))){
            const index = posts.indexOf(el)
            for (const comment of posts[index].comments) {
                commentsContainer.append(createComment(comment))
            }
        }
    }

    const createButton = createEl("button", "Create", "button")
    createButton.addEventListener("click", () => {
        createButton.before(createInputBlock("comments", "Your opinion..."))
        const submitButton = createEl("button", "Submit", "button")
        submitButton.addEventListener("click", () => {
            const commentText = document.querySelector(".commentsInput").value
            getUsername().then(username => {
                const comment = {
                    author: username,
                    date: getCurrentDay(),
                    text: commentText,
                    postID: localStorage.getItem("articleID")
                }
                postMethod(comment, "/api/comment").then(res => {
                    const messageContainer = createEl("div", "", "messageContainer")
                    if(res){
                        document.querySelector(".commentsInput").value = ""
                        commentsContainer.append(createComment(comment))

                        messageContainer.append(createEl("p", "Comment was created", "messageText"))

                        const posts = getValueFromLocalStorage("posts")
                        for (let el of posts) {
                            if(parseInt(el.id) === parseInt(localStorage.getItem("articleID"))){
                                const index = posts.indexOf(el)
                                posts[index].comments.push(comment)
                            }
                        }
                        const postsJSON = JSON.stringify(posts)
                        localStorage.setItem("posts", postsJSON)
                    }else{
                        messageContainer.append(createEl("p", "Comment was not created", "messageText"))
                    }
                    commentsContainer.prepend(messageContainer)
                    setTimeout(() => {messageContainer.remove()}, 5000)
                })
            })
            
        })
        createButton.after(submitButton)
        createButton.remove()
    })
    commentsSection.append(createButton)

    commentsSection.append(commentsContainer)

    document.querySelector(".postContainer").append(commentsSection)
}

function createComment(comment){
    const commentContainer = createEl("div", "", "comment")

    commentContainer.append(createEl("p", comment.author, "commentText"))
    commentContainer.append(createEl("p", comment.text, "commentMainText"))
    commentContainer.append(createEl("p", comment.date, "commentDate"))
    
    return commentContainer
}