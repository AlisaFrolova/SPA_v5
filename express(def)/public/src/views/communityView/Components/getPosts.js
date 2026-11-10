import tokenData from "../../../tokenModule.js"

export default function getPosts(){
    return tokenData.refreshAccessToken().then(() => {
        return fetch("/api/posts", {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
        }).then(res => {
            if(res.status === 200){
                return res.json().then(data => {
                    const postsJSON = JSON.stringify(data)
                    localStorage.setItem("posts", postsJSON)

                    localStorage.setItem("pageNumber", 1)
                    localStorage.setItem("maxPageNumber", Math.ceil(data.length/5))
                    
                    return true})
            }else{
                return false
            }
        })
    })
}