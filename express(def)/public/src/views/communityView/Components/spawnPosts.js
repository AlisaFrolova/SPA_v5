import { getValueFromLocalStorage } from "../../../tools.js"
import { getUsername } from "../../../tools.js"
import createPost from "./createPost.js"

export default function spawnPosts(container){
    getUsername().then(username => { 
        for (const post of getValueFromLocalStorage("posts")) {
            container.append(createPost(username, post))
        }
    })
}