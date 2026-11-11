import { getValueFromLocalStorage, shortenDescription } from "../../../tools/DataTools.js"
import { createPreviewCard } from "../../../tools/DOM_tools.js"

export default function spawnVideoCards(container){
    for (const el of getValueFromLocalStorage("videoArticles")) {
        container.append(createPreviewCard(el.links[0].href, 
            el.data[0].title,
             shortenDescription(el.data[0].description),
              el.data[0].nasa_id,
               "/video/article"))
    }
}