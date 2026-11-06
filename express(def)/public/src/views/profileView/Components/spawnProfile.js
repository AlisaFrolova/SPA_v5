import { getUser } from "../../../tools.js"
import { createEl } from "../../../tools.js"
import createPost from "../../communityView/Components/createPost.js"

export default function spawnProfile(username){
    const profile = createEl("section", "", "profile")

    getUser(username).then(user => {
        profile.append(createEl("p", user.username, "usernameText"))
        profile.append(createEl("p", user.id, "idText"))

        const postsContainer = createEl("div", "", "postsContainer")
        for (const post of user.posts) {
            postsContainer.append(createPost(username, post))
        }
        profile.append(postsContainer)
    })

    return profile
}