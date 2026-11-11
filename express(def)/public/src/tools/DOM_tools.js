
export function createEl(tag, text, className){
    const el = document.createElement(tag)
    el.classList.add(className)
    el.textContent = text
    return el
}

export function createPreviewCard(imgURL, title, description, id, href){
    const card = createEl("div", "", "previewCard")

    const textBlock = createEl("div", "", "previewText")
    textBlock.append(createEl("h2", title, "text"))
    
    textBlock.append(createEl("p", `${description} ... `, "text"))

    const articleLink = createEl("a", "Read more...", "link")
    if(href === "/video/article"){
        articleLink.textContent = "Watch..."
    }
    articleLink.href = href
    articleLink.setAttribute("data-link", "")
    textBlock.append(articleLink)
    
    card.append(textBlock)
    
    const img = createEl("img", "", "previewImg")
    img.src = imgURL
    card.prepend(img)

    card.addEventListener("click", () => {
        localStorage.setItem("articleID", id)
    })

    return card
}

export function spawnSearchBox(func){
    const searchBox = createEl("div", "", "searchBox")

    const searchLabel = createEl("label", "Search", "searchLabel")
    searchLabel.for = "searchInput"
    searchBox.append(searchLabel)

    const searchInput = createEl("input", "", "searchInput")
    searchInput.type = "text"
    searchInput.id = "searchInput"
    searchBox.append(searchInput)

    const submitButton = createEl("button", "Search", "button")
    searchBox.append(submitButton)
    submitButton.addEventListener("click", () => {
        func()
    })
    
    return searchBox
}

export function spawnNav(func){ 
    const navContainer = document.querySelector(".navContainer")
    if(navContainer) navContainer.innerHTML = ""
    else return 

    const currentPage = parseInt(localStorage.getItem("pageNumber"))

    if(currentPage > 1){
        if(currentPage > 2) {
            navContainer.append(createEl("button", 1, "navButton"))
            navContainer.append(createEl("p", "...", "text"))
        }
        navContainer.append(createEl("button", currentPage-1, "navButton"))
    }
    navContainer.append(createEl("p", currentPage, "currentPage"))

    const maxPage = parseInt(localStorage.getItem("maxPageNumber"))
    if(currentPage+1 < maxPage){
        navContainer.append(createEl("button", currentPage+1, "navButton"))
    }

    if(currentPage < maxPage) {
        navContainer.append(createEl("p", "...", "text"))
        navContainer.append(createEl("button", maxPage, "navButton"))
    }

    const navButtons = document.querySelectorAll(".navButton")
    for (const el of navButtons) {
        el.addEventListener("click", () => {
            localStorage.setItem("pageNumber", parseInt(el.textContent))
            spawnNav(func)
            func()
        })
    }
}

export function createLink(text, path){
    const link = createEl("a", text, "link")
    link.href = path
    link.setAttribute("data-link", "")
    return link
}

export function createInputBlock(type, labelText){
    const inputContainer = createEl("div", "", "inputContainer")

    const input = createEl("input", "", `${type}Input`)
    input.type = "text"
    input.id = `${type}Input`
    inputContainer.append(input)

    const label = createEl("label", labelText, `${type}Label`)
    label.for = `${type}Input`
    inputContainer.append(label)

    return inputContainer
}

export function spawnErrorMessage(container){
    const messageContainer = createEl("div", "", "messageContainer")
    messageContainer.append(createEl("p", "Invalid enter", "messageText"))
    setTimeout(() => {messageContainer.remove()}, 6000)
    container.append(messageContainer)
}