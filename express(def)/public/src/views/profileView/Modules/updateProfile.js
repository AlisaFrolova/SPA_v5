import { createEl } from "../../../tools.js"
import { postMethod } from "../../../tools.js"
import { createInputBlock } from "../../../tools.js"
import { getUsername } from "../../../tools.js"

export default function updateProfileSection(){
 const section = createEl("section", "", "updateSection")
 
 section.append(createEl("h1", "Update Profile", "header"))

 const inputContainer = createEl("div", "", "inputSection")
 inputContainer.append(createInputBlock("username", "Username: "))
 inputContainer.append(createInputBlock("bio", "Bio: "))

 const submitButton = createEl("button", "Submit", "button")
 submitButton.addEventListener("click" , () => {
    const username = document.querySelector(".usernameInput").value
    const bio = document.querySelector(".bioInput").value

    getUsername().then(res => {
        const userData = {
            newUsername: username,
            newBio: bio,
            username: res
        }

        postMethod(userData, "/api/updateUser").then(res => {
            const message = createEl("p", "", "message")
            if(res){
                document.querySelector(".usernameInput").value = ""
                document.querySelector(".bioInput").value = ""
                message.textContent = "User was updated!"
            }else{
                message.textContent = "User was not updated!"
            }
            section.append(message)
            setTimeout(() => {message.remove()}, 5000)
        })
    })
 })
 inputContainer.append(submitButton)

 section.append(inputContainer)

 return section
}