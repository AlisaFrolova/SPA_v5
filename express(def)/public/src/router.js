import homeView from "./views/homeView/homeView.js"
import spaceView from "./views/spaceView/spaceView.js"
import newsView from "./views/newsView/newsView.js"
import createAsteroidSection from "./views/spaceView/Modules/asteroidModule.js"
import signIn from "./views/authView/authView.js"
import spawnNewsArticle from "./views/newsView/Modules/newsArticleModule.js"
import { spawnLogoutButton } from "./tools.js"
import spawnHeader from "./spawnHeader.js"
import spawnFooter from "./spawnFooter.js"
import videoView from "./views/videoView/videoView.js"
import spawnVideoArticle from "./views/videoView/Modules/videoArticleModule.js"
import tokenData from "./tokenModule.js"
import communityView from "./views/communityView/communityView.js"
import createNewPost from "./views/communityView/Modules/createNewPost.js"
import getPost from "./views/communityView/Modules/postModule.js"
import spawnUpdatePostSection from "./views/communityView/Modules/updatePost.js"
import profileView from "./views/profileView/profileView.js"
import updateProfileSection from "./views/profileView/Modules/updateProfile.js"
import updatePassSection from "./views/profileView/Modules/updatePassword.js"

const routes = {
    "/": homeView,
    "/space": spaceView,
    "/news": newsView,
    "/auth": signIn,
    "/space/asteroids": createAsteroidSection,
    "/news/article": spawnNewsArticle,
    "/video": videoView,
    "/video/article": spawnVideoArticle,
    "/community": communityView,
    "/community/create": createNewPost,
    "/community/post": getPost,
    "/community/update": spawnUpdatePostSection,
    "/profile": profileView,
    "/profile/update": updateProfileSection,
    "/profile/password": updatePassSection
};

const appContainer = document.getElementById("app")

export const initRouter = () => {
    isAuth().then( res => {
        if(!res) {
            appContainer.innerHTML = ""
            appContainer.prepend(signIn())
            appContainer.append(spawnFooter())
            return
        }

        tokenData.refreshAccessToken().then(() => { //(?) !!!
            appContainer.append(homeView())
            spawnHeaderAndLogoutButton()
            appContainer.append(spawnFooter())

            const router = async () => {
            const path = window.location.pathname
            const viewPage = routes[path] || routes["/"]
            appContainer.innerHTML = ""

            spawnHeaderAndLogoutButton()
            appContainer.append(viewPage())
            appContainer.append(spawnFooter())
            }
            document.body.addEventListener("click", e =>{
                    if(e.target.matches("[data-link]")){
                        e.preventDefault()
                        window.history.pushState(null, null, e.target.href)
                        router()
                    }
                })
            document.addEventListener("DOMContentLoaded", router)
        })
    })
}

function spawnHeaderAndLogoutButton(){//--
    appContainer.prepend(spawnHeader())
    document.querySelector(".header").append(spawnLogoutButton())//-> 
}

function isAuth(){//-> (?) !!!
    return fetch("/api/isAuth", {
        method: "POST",
        credentials: "include"
    }).then(res => { 
        if (res.status === 200) {
            delete routes["/auth"]
            return true
        }
        else return false
    })
}

