import { createEl } from "../../../tools.js"
import spawnInputBox from "../Components/spawnInputBox.js"
import { postMethod } from "../../../tools.js"
import { getCurrentDay } from "../../../tools.js"

export default function createNewPost(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Create Post", "header"))

    section.append(spawnInputBox(post => {
        post.date = getCurrentDay()
        return postMethod(post, "/api/addPost")
    }))

    return section
}