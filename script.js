const apiKey = "c5dcf2bd8ec03ce99ceb4dd29e0ea60e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function getCurrentTime() {
    const currentDate = new Date();
    const currentHours = currentDate.getHours().toString().padStart(2, "0");
    const currentMinutes = currentDate.getMinutes().toString().padStart(2, "0");
    const currentTime = `${currentHours}:${currentMinutes}`;
  
    return currentTime;
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();
  
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
      document.querySelector(".pressure").innerHTML = data.main.pressure;
      document.querySelector(".description").innerHTML = data.weather[0].description;
  
      // Get the current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      const currentTime = getCurrentTime();
  
      // Combine the current date and time
      const currentDateTime = `${formattedDate} ${currentTime}`;
  
      // Set the current date and time in the "current-date" element
      document.querySelector(".current-date").innerHTML = currentDateTime;
  
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
  
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
}




  

  

