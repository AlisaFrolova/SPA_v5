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

export const shortenDescription = (description) => {
    if(!description) return ""
    if(description.length <= 250) return description

    return description.slice(0, 250).trim()
}