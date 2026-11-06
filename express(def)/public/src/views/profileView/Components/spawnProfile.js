import { getUser } from "../../../tools.js"
import { createEl } from "../../../tools.js"
import createPost from "../../communityView/Components/createPost.js"
import { getUsername } from "../../../tools.js"

export default function spawnProfile(username){
    const profile = createEl("section", "", "profile")

    const errorText = createEl("p", "User was not found", "errorText")

    getUsername().then(res => {
            getUser(username).then(user => {
            if(!user){ profile.append(errorText); return}
            profile.append(createEl("p", user.username, "usernameText"))
            profile.append(createEl("p", user.id, "idText"))

            const postsContainer = createEl("div", "", "postsContainer")
            if(user.posts){
                for (const post of user.posts) {
                    postsContainer.append(createPost(res, post))
                }
                const postsJSON = JSON.stringify(user.posts)
                localStorage.setItem("posts", postsJSON)
            }
            profile.append(postsContainer)

            const text = document.querySelector(".errorText")
            if(text) text.remove()
        })
    })

    return profile
}