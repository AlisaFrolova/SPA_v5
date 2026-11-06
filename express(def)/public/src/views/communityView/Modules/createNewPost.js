import { createEl } from "../../../tools.js"
import tokenData from "../../../tokenModule.js"
import spawnInputBox from "../Components/spawnInputBox.js"

export default function createNewPost(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Create Post", "header"))

    section.append(spawnInputBox(addPost))

    return section
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
                return false
            }
        })
    })
}

