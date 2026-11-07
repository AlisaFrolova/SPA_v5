import { createEl } from "../../../tools.js"
import tokenData from "../../../tokenModule.js"
import spawnPosts from "../Components/spawnPosts.js"
import { spawnNav } from "../../../tools.js"

export default function spawnCommunitySection(){
    const cardsContainer = createEl("section", "", "postsContainer")

    const loadingText = createEl("p", "Loading posts...", "loadingText")
    cardsContainer.append(loadingText)

    fetch("/api/spawn",{ method: 'GET', headers: { 'Content-Type': 'application/json' }}).then(() => {//! -- ^^
        getPosts().then(res => {
            loadingText.remove()

            if(res){
                spawnPosts(cardsContainer)

                const navigation = createEl("div", "", "navContainer")
                cardsContainer.after(navigation)
                spawnNav(() => {spawnPosts(cardsContainer)})
            }else{
                cardsContainer.append(createEl("p", "No posts yet ...", "errorText"))
            }
        })
    })

    return cardsContainer
}

function getPosts(){
    return tokenData.refreshAccessToken().then(() => {
        return fetch("/api/posts", {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
        }).then(res => {
            if(res.status === 200){
                return res.json().then(data => {
                    const postsJSON = JSON.stringify(data)
                    localStorage.setItem("posts", postsJSON)
                    localStorage.setItem("pageNumber", 1)
                    localStorage.setItem("maxPageNumber", Math.ceil(data.length/5))
                    return true})
            }else{
                return false
            }
        })
    })
}