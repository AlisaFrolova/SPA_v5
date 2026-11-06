import { createEl } from "../../../tools.js"
import spawnInputBox from "../Components/spawnInputBox.js"
import tokenData from "../../../tokenModule.js"
import { getValueFromLocalStorage } from "../../../tools.js"

export default function spawnUpdatePostSection(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Update Post", "header"))

    section.append(spawnInputBox(updatePost))
    
    return section
}

function updatePost(newPost){ //^^ -> copies in 3-4 places in CommunityView
    newPost.id = localStorage.getItem("articleID")
    return tokenData.refreshAccessToken().then(() => {
        return fetch("/api/updatePost", {   
        method: "POST",
        headers: { "Content-Type": "application/json", 
                "authorization": `Bearer ${tokenData.getAccessToken()}` },
        body: JSON.stringify(newPost)
        }).then(res => {
            if(res.status === 200){
                const posts = getValueFromLocalStorage("posts")

                for (let el of posts) {
                    if(parseInt(el.id) === parseInt(newPost.id)){
                        const index = posts.indexOf(el)
                        posts.splice(index, 1)
                        posts.push(newPost)
                    }
                }
                const postsJSON = JSON.stringify(posts)
                localStorage.setItem("posts", postsJSON)
                return true
            }else{
                return false
            }
        })
    })
}