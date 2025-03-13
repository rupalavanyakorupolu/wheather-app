let show = document.getElementById("show");
let search = document.getElementById("search");
let cityVal = document.getElementById("city");

// Make sure you have your own API key.
let key = "2f745fa85d563da5adb87b6cd4b81caf";

// Check if a city is saved in local storage
let savedCity = localStorage.getItem("city");

// If a city is saved in local storage, set it as the input value
if (savedCity) {
  cityVal.value = savedCity;
} else {
  // If no city is saved, set the default city
  cityVal.value = "enter the city";
}

let getWeather = () => {
  let cityValue = cityVal.value;
  if (cityValue.length == 0) {
    show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
  }
  else {
    // Save the city name to local storage for future use
    localStorage.setItem("city", cityValue);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    cityVal.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        show.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp_container">
         <div>
            <h4 class="title">min</h4>
            <h4 class="temp">${data.main.temp_min}&#176;</h4>
         </div>
         <div>
            <h4 class="title">max</h4>
            <h4 class="temp">${data.main.temp_max}&#176;</h4>
         </div>   
        </div>
        `;
      })
      .catch(() => {
        show.innerHTML = `<h3 class="error">City not found</h3>`;
      });
  }
};

search.addEventListener("click", getWeather);

// Fetch the weather when the page loads (using the saved city or default)
window.addEventListener("load", getWeather);
