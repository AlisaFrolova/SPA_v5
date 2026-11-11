import createPost from "./createPost.js"
import { getValueFromLocalStorage } from "../../../tools/DataTools.js"
import { getUsername } from "../../../tools/API_tools.js"

export default function spawnPosts(container){
    container.innerHTML = ""
    getUsername().then(username => { 
        let posts= getValueFromLocalStorage("posts")

        let endIndex = 5*parseInt(localStorage.getItem("pageNumber"))
        let startIndex = endIndex-5
        if(endIndex > posts.length) {
            endIndex = posts.length
        }
        posts = posts.slice(startIndex, endIndex)

        for (const post of posts) {
            container.append(createPost(username, post))
        }
    })
}