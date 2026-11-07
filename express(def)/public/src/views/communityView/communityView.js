import spawnCommunitySection from "./Modules/spawnCommunitySection.js"
import { createEl } from "../../tools.js"
import { createLink } from "../../tools.js"

export default function communityView(){
    //section
    const communitySection = createEl("section", "", "communitySection")

    //header
    communitySection.append(createEl("h1", "Community", "header"))

    //link
    const linkBlock = createEl("div", "", "linkBlock")

    linkBlock.append(createLink("Create Post", "/community/create"))

    communitySection.append(linkBlock)

    //posts
    communitySection.append(spawnCommunitySection())

    return communitySection
}