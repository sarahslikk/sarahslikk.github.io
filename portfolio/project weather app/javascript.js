document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'caaea630486efc7bdd463739e8f5546c';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const fahconverter = document.querySelector(".fah");
    const celconverter = document.querySelector(".cel");
    const moreinfo = document.querySelector(".more-info");
    const infoText = document.querySelector(".info-text");
    const infocard = document.querySelector(".more-info-card");
    const mphconverter = document.querySelector(".mph");
    const kphconverter = document.querySelector(".kph");

    async function fetchWeatherData(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        return await response.json();
        
    }

async function checkWeather(city) {
    try {
        const data = await fetchWeatherData(city);
        if (data.cod == 404) { //code in the response data
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".info-text").style.display = 'none';
            document.querySelector(".more-info-card").style.display = 'none';
            document.querySelector(".details").style.display = 'none';
        } if (data.cod == 400) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".info-text").style.display = 'none';
            document.querySelector(".more-info-card").style.display = 'none';
            document.querySelector(".details").style.display = 'none';
        }
        else {
            //figure out a better way to iterate through the data
            document.querySelector(".city").innerHTML = `${data.name}`;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
            document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            data.weather[0].main == 'Clouds' ? weatherIcon.src = "images/cloudy.png" 
            : data.weather[0].main == 'Clear' ? weatherIcon.src = 'images/clear.png' 
            : data.weather[0].main == 'Rain' ? weatherIcon.src = "images/rain.png"
            : data.weather[0].main == 'Drizzle' ? weatherIcon.src = "images/drizzle.png"
            : data.weather[0].main == 'Mist' ? weatherIcon.src = "images/mist.png" : 0;
    
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
            document.querySelector(".details").style.display = 'block';
          //  document.querySelector(".info-text").style.display = 'block';
         //   document.querySelector(".more-info-card").style.display = 'block';

    }
    console.log(data);
} catch (error) {
    console.error(error);
        // Handle error
        document.querySelector(".info-text").style.display = 'none';
        document.querySelector(".more-info-card").style.display = 'none';
    }
}
async function celToFah(city) {
    try {
        const data = await fetchWeatherData(city);
        const celtemp = data.main.temp;
        const fahtemp = (celtemp * 9 / 5) + 32;
        // Update temperature display
        document.querySelector(".temp").innerHTML = Math.round(fahtemp) + '°F';
    } catch (error) {
        console.error(error);
        // Handle error
    }

}
async function fahToCel(city) {
    try {
        const data = await fetchWeatherData(city);
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    } catch (error) {
        console.error(error);
    }
}
async function moreInfo(city) {
    try {
        const data = await fetchWeatherData(city);
        //data.weather.main
        //data.main.feels_like
        //data.main.temp_max
        //data.weather.description
        //data.sys.country
        //data.wind.gust
        let fah = Math.round((data.main.temp * 9/5) + 32);
        let maxfah = Math.round((data.main.temp_max * 9/5) + 32);
        let fahfeelslike = Math.round((data.main.feels_like * 9/5)+32);
        const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
        const sunset = new Date((data.sys.sunset + data.timezone) * 1000)
        infoText.innerHTML = `${data.name}, ${data.sys.country}\n
        ${data.weather[0].main}: ${data.weather[0].description}\n
        Temperature: ${Math.round(data.main.temp)}°C/${fah}°F\n
        Max Temperature: ${Math.round(data.main.temp_max)}°C/${maxfah}°F\n
        Feels like: ${Math.round(data.main.feels_like)}°C/${fahfeelslike}°F\n
        Wind gust: ${data.wind.gust} km/hr\n
        Wind speed: ${data.wind.speed} km/hr`;
        infocard.style.display = 'block';

        //infocard.style.display = block;
    } catch (error) {
        console.error(error);
    }
}

async function kphToMph(city) {
    try {
        const data = await fetchWeatherData(city);
        let mph = (data.wind.speed / 1.609).toFixed(2);
        document.querySelector(".wind").innerHTML = mph + " mph";
    } catch (error) {
        console.error(error);
    }
}
async function mphToKph(city) {
    try {
        const data = await fetchWeatherData(city);
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
        console.error(error);
    }
}



moreinfo.addEventListener('click', async () => {
    // Toggle the visibility of the info text and info card
    if (infocard.style.display === 'block') {
        //infoText.style.display = 'none';
        infocard.style.display = 'none';
        infoText.innerHTML = '';
    }
    else {
    infoText.style.display = 'block';
    infocard.style.display = 'block';
    infoText.innerHTML = '';

    moreInfo(searchBox.value);
    }

});

mphconverter.addEventListener('click', () => {
    kphToMph(searchBox.value);
});

kphconverter.addEventListener('click', () => {
    mphToKph(searchBox.value);
});

fahconverter.addEventListener('click', () => {
    celToFah(searchBox.value);
});

celconverter.addEventListener('click', () => {
    fahToCel(searchBox.value);
});
 
searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
    infocard.style.display = "none";
    //passes what is typed written in the input field
    //passes as city name
});
searchBox.addEventListener('keypress', function (e) {
    if ((e.key === 'Enter') && searchBox.value.trim() !== '') {
        checkWeather(searchBox.value);
        infocard.style.display = "none";
      // code for enter
    }});
//update temp, city, humidity, wind according to data
});

//move more info to below the weather card
//move wind to right side of main weather
//add another api for cool background

//add a view more information button
//add hover effects for search button and other buttons
//change colors and stuff, add animations
//add view city button -> get api of recent image over city
//add a button to switch between celsius and fahrenheit or mph/kph
//add that as a separate function that just converts celsius to fahrenheit
//separate functions with event listener click
//for more info button, conversion buttons
//and converts kmh to mph
//add a did not recognize that city error
//add states abbrev. next to city name (if in usa)
//add country under city name 
//idk where to get this
//more information - maybe add weather at certain times or weather tomorrow
//with more information - on hover: add a hint box 
// that shows what more info will display -
//example: Click more to learn about sea level, humidity, etc of of ${city}!

