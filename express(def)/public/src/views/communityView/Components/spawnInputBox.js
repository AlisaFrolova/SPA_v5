import { createEl } from "../../../tools.js"
import { getUsername } from "../../../tools.js"
import { createInputBlock } from "../../../tools.js"

export default function spawnInputBox(func){ 
    const inputSection = createEl("section", "", "inputSection")
    inputSection.append(createInputBlock("title", "Title of post"))
    inputSection.append(createInputBlock("description", "Description of post"))

    const submitButton = createEl("button", "Submit", "button")
    inputSection.append(submitButton)
    submitButton.addEventListener("click", () => {
        const title = document.querySelector(".titleInput").value
        const description = document.querySelector(".descriptionInput").value

        if(title !== "" && description !== ""){
            getUsername().then(username => { 
                const post = {
                 author: username,
                 title: title,
                 description: description
                }

                func(post).then(res => {
                    const messageContainer = createEl("div", "", "messageContainer")
                    if(res){
                        document.querySelector(".titleInput").value = ""
                        document.querySelector(".descriptionInput").value = ""
                        messageContainer.append(createEl("p", "Post has been created/changed!", "messageText"))
                    }else{
                        messageContainer.append(createEl("p", "Something went wrong...", "messageText"))
                    }
                    document.querySelector(".inputSection").append(messageContainer)
                    setTimeout(() => {messageContainer.remove()}, 5000)
                })
            })
        }
    })

    return inputSection
}