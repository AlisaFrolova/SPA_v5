import spawnCommunitySection from "./Modules/spawnCommunitySection.js"
import { createEl } from "../../tools.js"

export default function communityView(){
    //section
    const communitySection = createEl("section", "", "communitySection")

    //header
    communitySection.append(createEl("h1", "Community", "header"))

    //link
    const linkBlock = createEl("div", "", "linkBlock")

    const link = createEl("a", "Create Post", "link")
    link.href = "/community/create"
    link.setAttribute("data-link", "")
    linkBlock.append(link)

    communitySection.append(linkBlock)

    //posts
    communitySection.append(spawnCommunitySection())

    return communitySection
}