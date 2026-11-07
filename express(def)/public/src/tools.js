import tokenData from "./tokenModule.js"

export function createEl(tag, text, className){
    const el = document.createElement(tag)
    el.classList.add(className)
    el.textContent = text
    return el
}

let date = Date() //Wed Sep 23 2026 22:09:10 GMT+0300 (Moscow Standard Time)
date = new Date(date)

const currentDay = {
    year: date.toString().slice(11, 15), //2026
    month: (date.getMonth()+1).toString(), //9
    day: date.toString().slice(8, 11)//23
}

export const getCurrentDay = () => {
    if(parseInt(currentDay.month) >= 10){
        return `${currentDay.year}-${currentDay.month}-${currentDay.day}`
    }
    return `${currentDay.year}-0${currentDay.month}-${currentDay.day}`
}

export function getPreviousDay(){
    let day = parseInt(currentDay.day)
    let month = parseInt(currentDay.month)
    let year = parseInt(currentDay.year)

    for(let i = 0; i < 2; i++){
        day--
        if(day < 1){
            month--
            day = 30
            if(month < 1){
                year--
                month = 12
            }
        }
    }
    if(month >= 10){
        return `${year}-${month}-${day}`
    }

    return `${year}-0${month}-${day}`
}

export function getRandomNumber(min, max) {//may be equal to MIN, but always less than MAX
  return Math.floor(Math.random() * (max - min) + min)
}

export function getValueFromLocalStorage(key){
    const getArr = localStorage.getItem(key)
    return JSON.parse(getArr)
}

export function spawnLogoutButton(){
    const authLink = document.querySelector("#authLink") 
    if(authLink) authLink.remove() 
    const form = document.querySelector(".form")
    if(form) form.remove()

    const logoutButton = createEl("button", "Log out", "logoutButton")
    logoutButton.addEventListener("click", () => {
        logout()
    })
    return logoutButton
}

export function logout(){
    tokenData.clearTokens().then(res => {
        if(res) {
            const logoutButton = document.querySelector(".logoutButton")
            if(logoutButton) logoutButton.remove()
            window.location.replace("/")
        }
    })
}
export function postMethod(data, path){
    return tokenData.refreshAccessToken().then(() => {
        return fetch(path, {
            method: "POST",
            headers:{ "Content-Type": "application/json", 
                    "authorization": `Bearer ${tokenData.getAccessToken()}` },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.status === 200){
                return true
            }else {logout(); return false }
        })
    })
}
// export function getMethod(path, key){
//     return tokenData.refreshAccessToken().then(() => {
//         return fetch(path, {
//             method: "GET", 
//             headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
//         }).then(res => {
//             if(res.status === 200){
//                 return res.json().then(data => {
//                     //!
//                 })
//             }else{logout(); return false}
//         })
//     })
// }


export const shortenDescription = (description) => {
    if(!description) return ""
    if(description.length <= 250) return description

    return description.slice(0, 250).trim()
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

export function getUsername(){
    return tokenData.refreshAccessToken().then(() => {
        return fetch('/api/username', {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
        }).then(response => {
            if(response.status === 200){
                return response.json().then(data => {
                    return data.username
                })
            }else{
                logout()
                return false
            }
        })
    })
}

export function getUser(username){
    return tokenData.refreshAccessToken().then(() => {
        return fetch('/api/user', {   
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` },
        body: JSON.stringify({username: username})
        }).then(response => {
            if(response.status === 200){
                return response.json().then(data => {
                    return data //object: username, id, posts
                })
            }else{
                return false
            }
        })
    })
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