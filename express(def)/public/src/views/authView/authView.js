import tokenData from "../../tokenModule.js"
import spawnForm from "./Modules/formModule.js"
import { spawnLogoutButton } from "../../tools/authTools.js"

export default function signIn(){
    tokenData.refreshAccessToken().then(res =>{
        if(res){
            spawnLogoutButton()
        }else{
            document.querySelector("#app").prepend(spawnForm())
        }
    })
    return ""
}