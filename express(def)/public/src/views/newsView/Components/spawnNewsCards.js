import getDescription from "./getDescription.js"
import { getValueFromLocalStorage, shortenDescription } from "../../../tools/DataTools.js"
import { createPreviewCard } from "../../../tools/DOM_tools.js"

export default function spawnNewsCards(){
    const container = document.querySelector(".previewCardsContainer")
    if(container) container.innerHTML = ""
    else return
    let articles = getValueFromLocalStorage("newsArticles")

    let endIndex = 10*parseInt(localStorage.getItem("pageNumber"))
    let startIndex = endIndex-10
    if(endIndex > articles.length) {
        endIndex = articles.length
    }
    articles = articles.slice(startIndex, endIndex)
    for (const el of articles) {
        container.append(createPreviewCard(el.hdurl, 
            el.title, shortenDescription(getDescription(el)), 
             el.post_id, 
              "/news/article"))
    }
}