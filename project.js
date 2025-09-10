
       const apiKey = "54190ab8a731b3c51f5e34b632f76a9e";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
       const weatherIcon = document.querySelector(".weather-icon");
        
       var map = L.map("map").setView([51.505,-0.09],20)
       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
attribution:
'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
       var marker;
       async function checkWeather(city){
            const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
            console.log(response);
            
            if(response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                
        
            }else
            {var data = await response.json();
        
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".feel").innerHTML =Math.round(data.main.feels_like) + "°C";

    //map method
const weatherIcons = {
"Rain":"images/rain.png" ,
"Clouds":"images/clouds.png",
"Clear":"images/clear.png" ,
"Mist":"images/mist.png",
"Snow":"images/snow.png" ,
};
const weatherType = data.weather[0].main;
weatherIcon.src = weatherIcons[weatherType];
    
const lat = data.coord.lat;
const lon = data.coord.lon;
map.flyTo([lat,lon], 10, {duration: 12});

if (marker){
    map.removeLayer(marker);
}
marker = L.marker([lat,lon],{
    riseOnHover: true,
    zIndexOffset:1000
})
.addTo(map)
.bindPopup(
    `<b>${data.name}</b><br>Температура: ${Math.round(
        data.main.temp
    )}°C`,{offset:[0,-50]}
).openPopup();
//variety of icons 
    // if(data.weather[0].main == "Clouds")
// {
//     weatherIcon.src = "images/clouds.png";
// }
// else if(data.weather[0].main == "Clear")
// {
//     weatherIcon.src="images/clear.png"
// }
// else if(data.weather[0].main == "Rain")
// {
//     weatherIcon.src="images/rain.png"
// }
// else if(data.weather[0].main == "Mist")
// {
//     weatherIcon.src="images/mist.png"
// }
// else if(data.weather[0].main == "Snow")
// {
//     weatherIcon.src="images/snow.png"
// }
document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";

}

            
}    
    searchBtn.addEventListener("click", ()=>{
        checkWeather(searchBox.value);
    })
    
searchBox.addEventListener('keypress',function(e){
    var key = e.which || e.code;
    if (key===13){
        searchBtn.click();
    }

})
