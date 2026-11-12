import tokenData from "../tokenModule.js"
import {logout} from "./authTools.js"

export function postMethod(data, path){
    return tokenData.refreshAccessToken().then(() => {
        return fetch(path, {
            method: "POST",
            headers:{ "Content-Type": "application/json", 
                    "authorization": `Bearer ${tokenData.getAccessToken()}` },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.status === 200){
                fetch("/write", { method: 'GET', headers: { 'Content-Type': 'application/json' }})
                return true
            }else {logout(); return false }
        })
    })
}

export function isAdmin(){
    return tokenData.refreshAccessToken().then(() => {
        return fetch('/api/isAdmin', {   
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
        }).then(response => {
            if(response.status === 200){
                return response.json().then(data => {
                    if(data.isAdmin) return true
                    else return false
                })
            }else{
                logout()
                return false
            }
        })
    })
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