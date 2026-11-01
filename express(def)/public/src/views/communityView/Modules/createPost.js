import { createEl } from "../../../tools.js"
import { getCurrentDay } from "../../../tools.js"
import { getUsername } from "../../../tools.js"
import tokenData from "../../../tokenModule.js"

export default function createPost(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Create Post", "header"))

    section.append(spawnInputBox())

    return section
}

function spawnInputBox(){ //->
    const inputSection = createEl("section", "", "inputSection")
    inputSection.append(createInputBlock("title", "Title of post"))
    inputSection.append(createInputBlock("description", "Description of post"))

    const submitButton = createEl("button", "Create", "confirmButton")
    inputSection.append(submitButton)
    submitButton.addEventListener("click", () => {
        const title = document.querySelector(".titleInput").value
        const description = document.querySelector(".descriptionInput").value

        if(title !== "" && description !== ""){
            getUsername().then(username => { //->
                const post = {
                 author: username,
                 date: getCurrentDay(),
                 title: title,
                 description: description
                }
                addPost(post).then(res => {
                    const messageContainer = createEl("div", "", "messageContainer")
                    if(res){
                        document.querySelector(".titleInput").value = ""
                        document.querySelector(".descriptionInput").value = ""
                        messageContainer.append(createEl("p", "Post has been created!", "messageText"))
                    }else{
                        messageContainer.append(createEl("p", "Something went wrong...", "messageText"))
                    }
                    inputSection.append(messageContainer)
                    setTimeout(() => {messageContainer.remove()}, 5000)
                })
            })
        }
    })

    return inputSection
}

function addPost(post){
    return tokenData.refreshAccessToken().then(() => {
        return fetch("/api/addPost", {   
        method: "POST",
        headers: { "Content-Type": "application/json", 
                    "authorization": `Bearer ${tokenData.getAccessToken()}` },
        body: JSON.stringify(post)
        }).then(res => {
             if(res.status === 200){
                return true
             }else{
                return tokenData.refreshAccessToken().then(res => {
                    if(res) return getPosts()
                        else return false
                })
            }
        })
    })
}

function createInputBlock(type, labelText){//->
    const inputContainer = createEl("div", "", "inputContainer")

    const input = createEl("input", "", `${type}Input`)
    input.type = "text"
    input.id = `${type}Input`
    inputContainer.append(input)

    const label = createEl("label", labelText, `${type}Label`)
    label.for = `${type}Input`
    inputContainer.append(label)

    return inputContainer
}

