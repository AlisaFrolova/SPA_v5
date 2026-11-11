import getPosts from "../Components/getPosts.js"
import spawnPosts from "../Components/spawnPosts.js"
import { createEl, spawnNav } from "../../../tools/DOM_tools.js"

export default function spawnCommunitySection(){
    const cardsContainer = createEl("section", "", "postsContainer")

    const loadingText = createEl("p", "Loading posts...", "loadingText")
    cardsContainer.append(loadingText)

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

    return cardsContainer
}