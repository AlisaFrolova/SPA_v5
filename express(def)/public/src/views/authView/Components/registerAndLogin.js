import tokenData from "../../../tokenModule.js"

export function register(userData){
    fetch("/api/register", {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
        }).then(response => {
            if(response.status === 200){
                response.json().then(() => {
                    if(login(userData)){
                        fetch("/write", { method: 'GET', headers: { 'Content-Type': 'application/json' }}).then(() => {
                            console.log("fucking blablabla")
                        })

                    }

                    return true
                })
            }else{
                return false
            }
        })
}
export function login(userData){
    return fetch("/api/login", {   
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
        }).then(response => {
            if(response.status === 200){
                response.json().then(data => tokenData.setAccessToken(data.accessToken))
                .then(() => {
                window.location.replace("/")
                })
                return true
            }else{
                return false
            }
        })
}