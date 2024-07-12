let photos= [ "https://as2.ftcdn.net/v2/jpg/02/05/76/93/1000_F_205769392_VxzlZHzBvZhmFk11dpaMszMh8h6ZmIO7.jpg",
    "https://images.foxtv.com/static.fox13news.com/www.fox13news.com/content/uploads/2022/08/1280/720/FANCYFEAST.jpg?ve=1&tl=1",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/fancy-monaco-city-view-at-night-free-photo.jpg?w=2210&quality=70",
    "https://t4.ftcdn.net/jpg/02/27/04/73/360_F_227047389_LMBSNAJHKcH0FoHHlXjSOsPdAhN02WjD.jpg",
    "https://cdn.vox-cdn.com/thumbor/v2ug18dZbUw9BaDwKAcQJYnwRx0=/0x0:4928x3264/1200x800/filters:focal(2070x1238:2858x2026)/cdn.vox-cdn.com/uploads/chorus_image/image/55047029/shutterstock_180200633.0.jpg",
    "https://images.adsttc.com/media/images/65bb/567d/87f3/9376/5913/138d/large_jpg/lessons-from-relocating-and-building-new-capital-cities-in-the-global-south_5.jpg?1706776215",
    "https://t3.ftcdn.net/jpg/02/92/78/36/360_F_292783691_qYXzNyikvZmW95yP9WTtuCzaZy8mEK8v.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/12/canmandawe-ftTsK4QinMw-unsplash-1024x575.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/moscow-1024x576.png",
    "https://bigseventravel.com/wp-content/uploads/2019/08/claudio-schwarz-purzlbaum-TScGhJM716g-unsplash-1024x683.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/barcelona-1024x683.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/ralf-leineweber-623683-unsplash-1024x768.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/los-angeles-1024x575.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/kalit-gautam-1073231-unsplash-1024x683.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/ramida-made-1356094-unsplash-1024x683.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/anthony-delanoix-575672-unsplash-1024x683.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/jasrelle-serrano-1385905-unsplash-1024x682.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/pattaya-1024x695.jpg",
    "https://bigseventravel.com/wp-content/uploads/2019/03/phuket.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAPihxrwh1m2o78facfJqaqrYzIQGVZCfN0w&s"
]
let showingIndex=0;

let tempOptions= document.querySelector("div#tempreture-type").childNodes;
let imperial= true;
let locationOfUser= null;

// This is the nv functions

// This shows the remainig forcast days
let forcastBox= document.querySelector("#forcast-box");
let dailyForcast= document.querySelector("#daily-forcast")

let forrcasts= document.querySelectorAll(".forcast");
let forcastButtons= document.querySelector("div#right").childNodes;

for(let i=0; i < 24; i++){
    dailyForcast.appendChild(document.createElement("div"))
}
for(let i=1; i < 25; i++){
    dailyForcast.childNodes[i].classList.add("hour-forcast");
    dailyForcast.childNodes[i].appendChild(document.createElement("h4"));
    dailyForcast.childNodes[i].appendChild(document.createElement("img"));
    dailyForcast.childNodes[i].appendChild(document.createElement("h5"));
}
for(let i=1; i <25; i++){
    dailyForcast.childNodes[i].childNodes[0].textContent= "02:00";
    dailyForcast.childNodes[i].childNodes[1].src= "./assets/weather-icons/rain.svg";
    dailyForcast.childNodes[i].childNodes[2].textContent= "42°";
}
function changeForcast(){
    forcastButtons[3].classList.toggle("not-active-h2");
    forcastButtons[1].classList.toggle("not-active-h2");

    let notActive= document.querySelector(".not-active-h2").textContent

    if(notActive== "Week forcast"){
        forcastBox.style.display= "none"
        dailyForcast.style.display= "flex"
    }
    else if(notActive== "Daily forcast"){
        forcastBox.style.display= "flex"
        dailyForcast.style.display= "none"

    }
    
}

// The Main Weather display Section
let dateSection= document.querySelector("#date").childNodes;
let locationOfPerson,  date, time;

// The MAIN  VILLIAN ~~~~~~~~~~~~~({}}~~~~~ . . ~~~~~{}) so hrd...
const APIKEY= "ZULWH5ESYDHNXPX425ZAVJY2T";
const LOCATIONAPI= "1RoAgwmWMHetyxZzfHAR5nnjhwzxkeTctOQkOOgvXulGafjY15LxbJov";

let longitude, latitude;
let apiData;

// HTML Elements
let submitButton= document.querySelector("form");
let uvStatus= document.querySelector("div#uvIndex").childNodes;

let windStatus= document.querySelector("div#info-one").childNodes[1];
let windBars= document.querySelectorAll("div.wind-bars");
let sunRiseSet= document.querySelectorAll("div.sun-timing");
let windData=[];

let humidity= document.getElementById("humidity").childNodes;
let visibility= document.getElementById("visibility").childNodes;
let feelsLike= document.getElementById("feels-like").childNodes;
let currentDisplay= document.querySelector('div.weather').childNodes;



let durban= JSON.parse(localStorage.getItem('players'));
let newyork= JSON.parse(localStorage.getItem('player-1'));
let cleveland= JSON.parse(localStorage.getItem('player-2'));

submitButton.addEventListener('submit', async event =>{
    let city= document.querySelector("input").value.toString();
    event.preventDefault();
    
    if(city){ 
        try {
            city = city.toLowerCase().split(",");
            const WeatherData= await getVisualWeatherData(city[0], city[1]);
            console.log(WeatherData);
            apiData= WeatherData;

            if(apiData){
                displayWeatherData();
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }
})

async function getVisualWeatherData(cityname, countrycode){
    const apiUrl= `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityname},${countrycode}?key=${APIKEY}`;

    const response= await fetch(apiUrl);

    if(!response.ok){
        console.error("network not working")
    }
    
    return response.json()

}
//THe main, display function
function displayWeatherData(){
    const CURRENTDATA= apiData.currentConditions

    displayCurrentWeather(CURRENTDATA, apiData)

    displaywindStatus(CURRENTDATA.windspeed, apiData.days[0].hours);
    displayUvIndex(apiData.days[0].uvindex);
    displaySunRiseSet(CURRENTDATA.sunrise, CURRENTDATA.sunset);
    displayHumidity(CURRENTDATA.humidity);
    displayVisibility(CURRENTDATA.visibility);
    displayFeels(CURRENTDATA.feelslike);
    displayWeatherForcast(apiData.days);
    displayDaily(apiData.days[0].hours)
    
    if(!imperial){
        createTemps(apiData)
    }
    
}
    function displayWeatherForcast(data){
        for(let i= 0, b=1; i < 7; i++, b++){
            forrcasts[i].childNodes[1].textContent= dayOfWeek(data[b].datetime).slice(0, 3); //wed formt
            forrcasts[i].childNodes[3].src= `./assets/weather-icons/${data[b].icon}.svg`; //img src 

            forrcasts[i].childNodes[5].childNodes[0].textContent=` ${Math.floor(data[b].tempmax)}°`; //mx tempreture
            forrcasts[i].childNodes[5].childNodes[1].textContent=` ${Math.floor(data[b].tempmin)}° ` ; //min tempreture
        }
    }
    function displayFeels(value){
        let text;

        if(value >= 19 && value < 53){
            text= "Temperature feels pleasant"
        }
        else if(value >= 53  && value < 62){
            text= "Weather feels warm now"
        }
        else if(value >= 62 && value < 66){
            text=  " Heat feels uncomfortable"
        }
        else if(value >=66 && value < 70){
            text= " Weather feels very hot"
        }
        else if(value > 70){
            text= " Conditions feel extremely hotness"
        }
        else if(value < 19){
            text= " It is a bit chilly"
        }

        if(value.length < 3){
            feelsLike[1].childNodes[3].childNodes[2].textContent= value.toString().padStart(2, "0");
        }

        value= Math.round(value)
        feelsLike[1].childNodes[3].childNodes[2].textContent= value
        feelsLike[3].childNodes[0].textContent= text;

    }
    function displayVisibility(value){
        value= Math.round(value)
        visibility[1].childNodes[3].firstChild.textContent= value.toString().padStart(2, "0");
        let text;

        if(value >= 0 && value < 3){
            text= "Fog is very dense"
        }
        else if(value >= 3  && value < 6){
            text= "Haze is visible now"
        }
        else if(value >= 6 && value < 10){
            text=  "Visibility is fair"
        }
        else if(value >=10 && value < 20){
            text= "Visibility is good "
        }
        else if(value > 20){
            text= "Visibility is excellent "
        }

        visibility[3].childNodes[2].textContent= text;
        visibility[1].childNodes[3].childNodes[1].textContent= "m"
        

    }
    function displayHumidity(humid){
        humid= humid.toString();
        humid= humid.slice(0, humid.lastIndexOf(".")).padStart(2, "0");
        humidity[1].childNodes[3].firstChild.textContent= humid
        let text;

        if(humid >= 0 && humid < 30){
            text= "Air is very dry"
        }
        else if(humid >= 31  && humid < 51){
            text= "Humidity is comfortable"
        }
        else if(humid >= 51 && humid < 76){
            text=  " Humidity is noticeable"
        }
        else if(humid >=76 && humid < 91){
            text= "Humidity is quite high"
        }
        else if(humid >= 91){
            text= "Humidity is extremely high"
        }

        humidity[3].childNodes[2].textContent= text;

    }
    function displaySunRiseSet(rise, set){
        sunRiseSet[0].childNodes[3].textContent= formateTime(rise);
        sunRiseSet[1].childNodes[3].textContent= formateTime(set);
    }
    function displaywindStatus(wind, winsStats){

        windData=[];
        for(let i= 0; i < 24; i++){
            windData.push(winsStats[i].windspeed);
        }

        let padding= 2;
        if(wind.length > 2){
            padding= 3;
        }


        windStatus.innerHTML= ` ${wind.toString().padStart(padding, "0")} <span>mph</span>`;
        
        let stats= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let index= 0;
        let height= 0;
        let barHight= 100;
        for(let i =0;  i < 2 ; i++){
        
            for(let i =0;  i < 12; i++){
                stats[i]+= windData[index];
                height+= windData[index];
                index++
            }
        }
        if(height < 300){
            barHight= 40
        }
        for(let i =0;  i < 12 ; i++){
            windBars[i].style.height= `${90 * (stats[i]/ barHight)}px`
        }
        

    }
    function displayUvIndex(uvIndex){
        uvStatus[5].childNodes[1].firstChild.textContent= uvIndex;
        let length= 2 * Math.PI * 70;
        let percent= (uvIndex/11) * 100;
        let dashLength= length * (percent/100);
        let dashGap= length - dashLength;
        let fullHalfLength= dashLength/2;
        let fullDashGap= dashGap/2;
        let halfLength= length/2;
        let halfDashGap= dashGap/2/2;


        uvStatus[3].childNodes[1].childNodes[3].style.strokeDasharray= `${fullHalfLength + halfLength} ${fullDashGap + halfDashGap}`;
    }
    function displayCurrentWeather(dataToday, data){

        let icon=dataToday.icon, 
            temp= dataToday.feelslike, 
            description= data.description, 
            location= data.resolvedAddress.toString(),
            date= data.days[0].datetime, 
            time= formateTime(dataToday.datetime);

        currentDisplay[1].childNodes[1].src =`./assets/weather-icons/${icon}.svg`;//= icon; 
        currentDisplay[3].childNodes[0].textContent= Math.round(Number(temp)); 
        currentDisplay[3].childNodes[1].textContent= " °F"; 

        currentDisplay[5].childNodes[0].textContent= dayOfWeek(date);
        currentDisplay[5].childNodes[1].innerText = time;

        currentDisplay[7].childNodes[1].childNodes[2].textContent= description; 

        currentDisplay[7].childNodes[3].childNodes[3].childNodes[0].textContent= location.slice(0, location.indexOf(",")); 
        currentDisplay[7].childNodes[3].childNodes[3].childNodes[1].textContent= location.slice(location.indexOf(",") + 1); 
    }
    function displayDaily(day){
        for(let i=1, b=0 ; i <25; i++, b++){
            dailyForcast.childNodes[i].childNodes[0].textContent= formateTime(day[b].datetime);
            dailyForcast.childNodes[i].childNodes[1].src= `./assets/weather-icons/${day[b].icon}.svg`;
            dailyForcast.childNodes[i].childNodes[2].textContent= `${day[b].temp}°`;
        }

    }
function formateTime(time){ 
    let check= time.toString().split(":").join("");

    if(time.length > 5 && !isNaN(check)){
        time= time.toString().slice(0, time.lastIndexOf(":"));
        let postMeridiem= time.slice(0, 2);
        if(postMeridiem > 12 ){
            time+= " PM";
        }
        else{
            time+= " AM"
        }
        return time
    }
    else{
        return time
    }
}

function dayOfWeek(date){
    console.log(date);
    date= date.toString().split("-");
    let year= date[0], month= date[1], day= date[2]; 
    let strtDte= 0;
    let weekDay;

    if(month==0 || month==1){
        month+=12;
        year--;
        let x= Math.floor((13*(month+1))/5)
        let y= Math.floor(year/4);
        let z= Math.floor(year/100);
        let f= Math.floor(year/400);
        let h= (day + x + year + y - z + f) % 7;
        let g= ((h + 5)%7) + 1;
        strtDte+= g;
    }
    else {
        let x= Math.floor((13*(month+1))/5)
        let y= Math.floor(year/4);
        let z= Math.floor(year/100);
        let f= Math.floor(year/400);
        let h= (day + x + year + y - z + f)%7;
        let g= ((h + 5)%7) + 1;
        strtDte+= g;
    }
    
    switch (strtDte) {
        case 1:
        weekDay= "Sunday";
            break;
        case 2:
        weekDay= "Monday" 
            break;
        case 3:
        weekDay= "Tuesday" ; 
            break;
        case 4:
        weekDay= "Wednesday";  
            break;
        case 5:
        weekDay= "Thursday" ; 
            break;
        case 6:
        weekDay= "Friday"; 
            break;
        case 7:
        weekDay= "Saturday";
            break;
    
        default: weekDay= "That is not a date"
            break;
    }
    return weekDay
}
document.addEventListener('click', event=>{
    
    // This changes the ferenhight
    switch (event.target.id) {
        case "ferenhight":
                tempOptions[1].attributes.class.textContent="tempreture-active" ;
                tempOptions[3].attributes.class.textContent="tempreture-not";
                imperial= true;
                try {
                    displayWeatherData()
                } catch (error) {
                    console.error(error)
                }
            break;

        case "celcius":
            tempOptions[3].attributes.class.textContent="tempreture-active" ;
            tempOptions[1].attributes.class.textContent="tempreture-not";
                imperial= false;
                try {
                    displayWeatherData()
                } catch (error) {
                    console.error(error)
                }
            break;        
        default:
            break;
    }
})

// clandestin


function getMonth(monthIndex){
    let months=[
        "January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "November", "October", "December"
    ]
    return months[monthIndex]
}
function getDate(){
    getTime();
    let fullDate=new  Date();
    date= `${fullDate.getDay().toString()} ${getMonth(fullDate.getMonth())} ${fullDate.getFullYear().toString()}`;
    dateSection[2]= date;
}
function getTime(){
    let fullDate=new  Date();
    time= `${fullDate.getHours()}:${fullDate.getMinutes()}`;
    if(fullDate.getHours() < 12){
        time += " AM";
    }
    else{
        time+= " PM";
    }
    dateSection[3].textContent= time;

    
}
function displayError(){
    if(errors.length> 0){
        let div= document.createElement('div');
        div.classList.add("errors");
        div.style.display= "flex"
        div.textContent= errors[0]
        document.body.appendChild(div)
    
        setTimeout(()=>{
            div.style.display= "none"
        }, 3000)
    }
}
function createTemps(data){
    //Chnges Tempretures

    currentDisplay[3].childNodes[0].textContent= Math.round((data.currentConditions.temp - 32) * 5/9); 
    currentDisplay[3].childNodes[1].textContent= " °C"; 

    // Forcst
    
    for(let i= 0, b= 1; i< 7; i++, b++){
        forrcasts[i].childNodes[5].childNodes[0].textContent=` ${Math.round((Number(data.days[b].tempmax) -32 ) * 5/9 )}°`; //mx tempreture
        forrcasts[i].childNodes[5].childNodes[1].textContent=` ${Math.round((Number(data.days[b].tempmin) -32 ) * 5/9 )}° ` ; //min tempreture
    }



    // Wind Status
    windStatus.innerHTML= ` ${Math.round(Number(data.currentConditions.windspeed) * 1.60934).toString().padStart(2, "0")} <span>km</span>`;


    // Visibility
    visibility[1].childNodes[3].childNodes[1].textContent= "km";
    visibility[1].childNodes[3].firstChild.textContent= Math.round(Number(data.currentConditions.visibility) * 1.6042).toString().padStart(2, "0");

    //feels like
    feelsLike[1].childNodes[3].childNodes[2].textContent= Math.round( (Number(data.currentConditions.feelslike) - 32) * 5/9);

    for(let i=1, b=0 ; i <25; i++, b++){
        dailyForcast.childNodes[i].childNodes[2].textContent= `${Math.round((Number(data.days[0].hours[b].temp) -32 ) * 5/9 )}°`; 
    }

}
function getLocation(){
    try {
        
    } catch (error) {
        
    }
    fetch("https://ipapi.co/json/")
    .then((response)=> response.json())
    .then( async (data) => {
        locationOfUser= await data;
        const WeatherData= await getVisualWeatherData(locationOfUser.city, locationOfUser.country);
            apiData= WeatherData;

            if(apiData){
                displayWeatherData();
            }
        
    })
    .catch((error)=>{
        console.log("it did", error)
    })
}
function chngePhotos(){
    if(showingIndex < photos.length){
        currentDisplay[9].childNodes[1].src= photos[showingIndex];
        showingIndex++
    } 
    else{
        showingIndex= 0
    }
}
setInterval(() => {
    chngePhotos();
}, 3500);

getLocation();
