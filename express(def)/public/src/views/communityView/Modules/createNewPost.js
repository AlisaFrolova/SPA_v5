import spawnInputBox from "../Components/spawnInputBox.js"
import { getCurrentDay } from "../../../tools/DataTools.js"
import { createEl } from "../../../tools/DOM_tools.js"
import { postMethod } from "../../../tools/API_tools.js"

export default function createNewPost(){
    const section = createEl("section", "", "creationSection")

    section.append(createEl("h1", "Create Post", "header"))

    section.append(spawnInputBox(post => {
        post.date = getCurrentDay()
        return postMethod(post, "/api/addPost")
    }))

    return section
}