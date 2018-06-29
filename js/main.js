// declare variables and select elements
var ROOT_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
var API_KEY = "5c9c16bbcd407b7eb00fd691e2b6df66"
// select the elements cityTitle, zip input bar, weather div, img with class icon, span with class 
// temp, span with class humid, select the spann with the class deg
var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var deg = document.querySelector('.deg')
var btn = document.querySelector('.convert');
var f 

var icons = {
    "Clouds" : "img/cloudy.png",
    "Rain" : "img/rain.png",
    "Snow" : "img/snow.png",
    "Thunderstorm" : "img/thunderstorm.png",
    "Clear" : "img/sun.png",
    "partly-cloudy" : "img/partly-cloudy.png"
}



// define functions
function iconSelector(weather){
    return icons [weather]
}
function FtoC(f){
    return Math.round(f-32 *(5/9))
}
// icons[`Clounds]
function kelvintofaren(kelvin){
    return Math.round((kelvin * 9/5) -459.67)
    
}

function getWeather(zipCode){
// console.log(zipCode)
$.ajax({
    type: `GET`,
    url:`${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
    dataType: `json`,
    success: function(data){
        console.log(data)
        title.textContent = data.name
        weather.textContent = data.weather[0].main
        f = kelvintofaren(data.main.temp)
        temp.textContent = f
        humid.textContent = data.main.humidity
        icon.src = iconSelector(data.weather[0].main)
        
        
    },
    error: function(error){
        console.log("There was an error")
    }
    
    
    
    
})
}

getWeather(32218)






// call functions and/or add Event Listeners
zip.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        getWeather(zip.value)
        
    }
})

btn.addEventListener("click", function(e){
    // console.log("ready to run function")
    if(btn.textContent ==  "Convert to C"){
    temp.textContent = FtoC(temp.textContent)
    deg.innerHTML = "&deg;C"
    btn.textContent = "Convert to F"
    }
    else{
        temp.textContent = f
        deg.innerHTML = "&deg;F"
        btn.textContent = "Convert to C"
    }
    
})
