import { createEl } from "../../../tools.js"
import tokenData from "../../../tokenModule.js"
import spawnPosts from "../Components/spawnPosts.js"

let posts = []

export default function spawnCommunitySection(){
    const cardsContainer = createEl("section", "", "communityPostsContainer")

    const loadingText = createEl("p", "Loading posts...", "loadingText")
    cardsContainer.append(loadingText)

    fetch("/api/spawn",{ method: 'GET', headers: { 'Content-Type': 'application/json' }}).then(() => {
        getPosts().then(res => {
            loadingText.remove()

            if(res){
                const postsJSON = JSON.stringify(posts)
                localStorage.setItem("posts", postsJSON)
                spawnPosts(cardsContainer)
            }else{
                cardsContainer.append(createEl("p", "No posts yet ...", "errorText"))
            }
        })
    })

    return cardsContainer
}

function getPosts(){
    return fetch("/api/posts", {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
        }).then(res => {
            if(res.status === 200){
                return res.json().then(data => {console.log(data); posts = data; return true})
            }else{
                return tokenData.refreshAccessToken().then(res => {
                    if(res) return getPosts()
                        else return false
                })
            }
        })
}