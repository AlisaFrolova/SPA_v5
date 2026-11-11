import { createEl } from "../../../tools/DOM_tools.js"

export default function createInfoText(key, value){
    const postInfoText = createEl("p", `${key}: `, "postInfoText")
    postInfoText.append(createEl("span", value, "innerText"))
    return postInfoText
}