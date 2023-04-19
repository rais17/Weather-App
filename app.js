
const API_KEY = "0a95166d7c3e8d8aa15801fa9dc5581c";
let weatherStatusEl = document.querySelector("[data-weatherStatus]");
let userWeatherTabEl = document.querySelector("[data-userWeather]");
let grantLocationEl = document.querySelector("[data-grantLocation]");
let errorEl = document.querySelector("[data-error]");

let currentTab = userWeatherTabEl;

window.addEventListener("load", () => {
    userWeatherTabEl.classList.add("current-tab");
    getFromSessionStorage();
});

function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    
    if (localCoordinates) {
        let coord = JSON.parse(localCoordinates);
        fetchUserWeatherData(coord);
    }
    else {
        grantLocationEl.classList.remove("hiddenn");
    }
}

// Grant Location Access :)
function renderData(data) {


    const cityNameEl = document.querySelector("[data-cityName]");
    cityNameEl.textContent = `${data?.name}`;

    const countryFlagEl = document.querySelector("[data-countryFlag]");
    countryFlagEl.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;

    const descEl = document.querySelector("[data-desc]");
    descEl.textContent = `${data?.weather?.[0]?.main}`;

    const descIconEl = document.querySelector("[data-descIcon]");
    descIconEl.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;

    const temperatureEl = document.querySelector("[data-temperature]");
    temperatureEl.textContent = `${data?.main?.temp} °C`;

    const windSpeedEl = document.querySelector("[data-windSpeed]");
    windSpeedEl.textContent = `${data?.wind?.speed} m/s`;

    const humidityEl = document.querySelector("[data-humidity]");
    humidityEl.textContent = `${data?.main?.humidity}%`;

    const cloudnessEl = document.querySelector("[data-cloudness]");
    cloudnessEl.textContent = `${data?.clouds?.all}%`;

}

let loaderEl = document.querySelector("[data-loader]")
async function fetchUserWeatherData(userCoordinate) {
    let lat = userCoordinate.latitude;
    let lon = userCoordinate.longitude;

    
    grantLocationEl.classList.add("hiddenn");
    loaderEl.classList.remove("hiddenn");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        loaderEl.classList.add("hiddenn");
        weatherStatusEl.classList.remove("hiddenn");
        const data = await response.json();
        
        renderData(data);
    }
    catch (error) {
        // Error handling
    }

}

function showLocation(position) {

    const userCoordinate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinate", JSON.stringify(userCoordinate));
    fetchUserWeatherData(userCoordinate);
}

function getLocation() {

    errorEl.classList.add("hiddenn");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
    else {
        errorEl.classList.remove("hiddenn");
    }
}

let accessGrantEl = document.querySelector("[data-accessGrant]");
accessGrantEl.addEventListener("click", getLocation);

// switch-section
var searchFormEl = document.querySelector("[data-searchForm]");
let searchWeatherTabEl = document.querySelector("[data-searchWeather]");

function switchTab(clickedTab) {
    if (currentTab != clickedTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (searchFormEl.classList.contains("hiddenn") ) {
            grantLocationEl.classList.add("hiddenn");
            weatherStatusEl.classList.add("hiddenn");
            searchFormEl.classList.remove("hiddenn");
        }
        else {
            errorEl.classList.add("hiddenn");
            searchFormEl.classList.add("hiddenn");
            weatherStatusEl.classList.add("hiddenn");
            getFromSessionStorage();
        }
    }
}

userWeatherTabEl.addEventListener("click", () => {
    switchTab(userWeatherTabEl);
})

searchWeatherTabEl.addEventListener("click", () => {
    switchTab(searchWeatherTabEl);
});


// search-city
async function fetchSearchWeatherData(city) {
    
    loaderEl.classList.remove("hiddenn");
    grantLocationEl.classList.add("hiddenn");
    weatherStatusEl.classList.add("hiddenn");
    errorEl.classList.add("hiddenn");
    
    
    try {
        const responseObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let searchData = await responseObj.json();
        if (!searchData.sys)
            throw searchData;
        loaderEl.classList.add("hiddenn");
        weatherStatusEl.classList.remove("hiddenn");
        weatherStatusEl.style.marginTop = "32px";
        renderData(searchData);
    }
    catch (error) {
        loaderEl.classList.add("hiddenn");
        errorEl.classList.remove("hiddenn");
    }
}
let searchCityEl = document.querySelector("[data-searchCity]");
searchFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchCityEl.value;
    if (cityName === "")
        return;
    fetchSearchWeatherData(cityName);
    
})

function homeOne() {
  hPoints++;
  homePoints.textContent = hPoints;
}

window.homeOne = homeOne;