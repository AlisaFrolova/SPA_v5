import { createEl, createInputBlock } from "../../../tools/DOM_tools.js"
import { postMethod, getUsername } from "../../../tools/API_tools.js"

export default function updatePassSection(){//! ^^ almost the same as the Update Profile, -> (?)
    const section = createEl("section", "", "updateSection")
    
    section.append(createEl("h1", "Update Password", "header"))

    const inputContainer = createEl("div", "", "inputSection")
    inputContainer.append(createInputBlock("password", "Current Password: "))
    inputContainer.append(createInputBlock("newPassword", "New Password: "))

    const submitButton = createEl("button", "Submit", "button")
    submitButton.addEventListener("click" , () => {
        const password = document.querySelector(".passwordInput").value
        const newPassword= document.querySelector(".newPasswordInput").value

        if(password !== "" && newPassword !== ""){
            getUsername().then(res => {
            const userData = {
                password: password,
                newPassword: newPassword,
                username: res
            }

            postMethod(userData, "/api/updatePass").then(res => {
                const message = createEl("p", "", "message")
                if(res){
                    document.querySelector(".passwordInput").value = ""
                    document.querySelector(".newPasswordInput").value = ""
                    message.textContent = "Password was updated!"
                }else{
                    message.textContent = "Password was not updated!"
                }
                section.append(message)
                setTimeout(() => {message.remove()}, 5000)
            })
        })
        }else{
            //blablabla
        }
    })
    inputContainer.append(submitButton)

    section.append(inputContainer)

    return section
}