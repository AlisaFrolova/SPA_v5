import { createEl } from "../../../tools.js"
import { getCurrentDay } from "../../../tools.js"
import { getUsername } from "../../../tools.js"

export default function spawnInputBox(func){ 
    const inputSection = createEl("section", "", "inputSection")
    inputSection.append(createInputBlock("title", "Title of post"))
    inputSection.append(createInputBlock("description", "Description of post"))

    const submitButton = createEl("button", "Submit", "confirmButton")
    inputSection.append(submitButton)
    submitButton.addEventListener("click", () => {
        const title = document.querySelector(".titleInput").value
        const description = document.querySelector(".descriptionInput").value

        if(title !== "" && description !== ""){
            getUsername().then(username => { 
                const post = {
                 author: username,
                 date: getCurrentDay(),
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

function createInputBlock(type, labelText){
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