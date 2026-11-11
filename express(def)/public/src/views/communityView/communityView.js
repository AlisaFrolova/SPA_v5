import spawnCommunitySection from "./Modules/spawnCommunitySection.js"
import { createEl, createLink } from "../../tools/DOM_tools.js"
import spawnSortBox from "./Components/spawnSortBox.js"

export default function communityView(){
    //section
    const communitySection = createEl("section", "", "communitySection")

    //header
    communitySection.append(createEl("h1", "Community", "header"))

    //link
    const linkBlock = createEl("div", "", "linkBlock")

    linkBlock.append(createLink("Create Post", "/community/create"))

    communitySection.append(linkBlock)

    //sort
    communitySection.append(spawnSortBox())

    //posts
    communitySection.append(spawnCommunitySection())

    return communitySection
}