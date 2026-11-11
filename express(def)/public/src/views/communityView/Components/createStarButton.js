import { getValueFromLocalStorage } from "../../../tools/DataTools.js"
import { createEl } from "../../../tools/DOM_tools.js"
import { postMethod, getUser, getUsername } from "../../../tools/API_tools.js"

export default function createStarButton(post){
    const starButton = createEl("button", `✯${post.stars}`, "button")
    getUsername().then(username => {
        starButton.addEventListener("click", () => {
            if(starButton.classList.contains("starButton")){
                post.stars = parseInt(post.stars)-1
                starButton.classList.remove("starButton")
            }else {
                post.stars = parseInt(post.stars)+1
                starButton.classList.add("starButton")
            }
            starButton.textContent = `✯${post.stars}`
            postMethod({postID: post.id, username: username, stars: post.stars}, "/api/starPost").then(res => {
                if(res){
                    const posts = getValueFromLocalStorage("posts")
                    for (let el of posts) {
                        if(parseInt(el.id) === parseInt(post.id)){
                            const index = posts.indexOf(el)
                            posts[index].stars = parseInt(post.stars)
                        }
                    }
                    const postsJSON = JSON.stringify(posts)
                    localStorage.setItem("posts", postsJSON)
                    return true
                }else return false
            })
        })
        getUser(username).then(user => {
            if(user.starredPosts.indexOf(post.id) !== -1) {
                starButton.classList.add("starButton")
            }
        })
    })
    return starButton
}