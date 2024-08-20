const inputElem = document.querySelector('input')

let apiData = {
    url: `https://api.openweathermap.org/data/2.5/weather?q=London&appid={ca192234b16572911be8eca3e4c7d52f}`,
    key: '5BUE3MXH497P97J35LABKCLUT'
}

let countryInitiallValue = "Tehran";

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryInitiallValue}?key=${apiData.key}`).
    then(res => res.json())
    .then(data => {
        console.log(data);
        showData(data)
    })

function fetchData () {
    let countryValue = inputElem.value

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryValue}?key=${apiData.key}`).
        then(res => res.json())
        .then(data => {
            console.log(data);

            showData(data)
        })
}

function showData (data) {
    let cityElem = document.querySelector('.city')
    cityElem.innerHTML = `${data.resolvedAddress}`

    let dateElem = document.querySelector('.date')
    dateElem.innerHTML = showDate()

    let tempElem = document.querySelector('.temp')
    tempElem.innerHTML = `${Math.floor((data.currentConditions.temp - 32)/1.8)}°c`

    let weatherElem = document.querySelector('.weather')
    weatherElem.innerHTML = `${data.currentConditions.conditions}`

    let tempsElem = document.querySelector('.hi-low')
    tempsElem.innerHTML = `${Math.floor((data.days[0].tempmin - 32)/1.8)}°c / ${Math.floor((data.days[0].tempmax - 32)/1.8)}°c`
}

function showDate () {


    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date()

    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()
    let date = now.getDate()
    
    return `${day} ${date} ${month} ${year}`

}

inputElem.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        fetchData()
    }
})

