import { createEl } from "../../../tools.js"
import spawnInputBox from "../Components/spawnInputBox.js"
import { getValueFromLocalStorage } from "../../../tools.js"
import { postMethod } from "../../../tools.js"

export default function spawnUpdatePostSection(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Update Post", "header"))

    section.append(spawnInputBox(updatePost))
    
    return section
}

function updatePost(newPost){
    newPost.id = localStorage.getItem("articleID")
    return postMethod(newPost, "/api/updatePost").then(res => {
        if(res.status === 200){
            const posts = getValueFromLocalStorage("posts")

            for (let post of posts) {
                if(parseInt(post.id) === parseInt(newPost.id)){
                    const index = posts.indexOf(post)
                    posts.splice(index, 1)
                    posts.push(newPost)
                }
            }
            const postsJSON = JSON.stringify(posts)
            localStorage.setItem("posts", postsJSON)

            return true
        }else {return false}
    })
}