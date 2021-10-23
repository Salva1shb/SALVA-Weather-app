//time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Tursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let datebar = document.querySelector("#dateshow");
datebar.innerHTML = `${day}, ${month} ${date}`;
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let timebar = document.querySelector("#timeshow");
timebar.innerHTML = `${hour}:${minute}`;

//show Temperature
function showTemp(response) {
  console.log(response.data);
  //show temp
  let templine = document.querySelector("#temp-h");
  let roundtemp = Math.round(response.data.main.temp);
  templine.innerHTML = `${roundtemp}°`;
  //show city
  let cityline = document.querySelector("h1");
  cityline.innerHTML = response.data.name;
  //show humidity
  let humidityline = document.querySelector("#humidity-h");
  let humidityInfo = response.data.main.humidity;
  humidityline.innerHTML = humidityInfo;
  //show wind
  let windline = document.querySelector("#wind-h");
  let windspeed = Math.round(response.data.wind.speed);
  windline.innerHTML = windspeed;
  //show weather description
  let descriptionline = document.querySelector("#weather-description-h");
  let description = response.data.weather[0].description;
  descriptionline.innerHTML = description;
  //show feels like
  console.log(response.data.main.feels_like);
  document.querySelector("#feels-like-h").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function getAxios(city) {
  let apikey = "dff5c692192605ee5ed7f95b423ae857";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

  axios.get(apiurl).then(showTemp);
}

function getCity(response) {
  response.preventDefault();
  let weatherinput = document.querySelector("#weatherinput-h");
  weatherinput.value = weatherinput.value.trim();
  let city = weatherinput.value;
  let cityline = document.querySelector("h1");
  cityline.innerHTML = `${city}`;
  console.log(city);
  getAxios(city);
}

let weatherform = document.querySelector("#weatherform-h");
weatherform.addEventListener("submit", getCity);

function defualtSearch(city) {
  let defaultCity = "Manchester";
  document.querySelector("h1").innerHTML = defaultCity;
  getAxios(defaultCity);
}

defualtSearch("Manchester");

//Geolocation API/current location

function getAxiosforplace(info) {
  console.log(info);
  let apikey = "dff5c692192605ee5ed7f95b423ae857";
  let lat = info.coords.latitude;
  let lon = info.coords.longitude;
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

  axios.get(apiurl).then(showTemp);
}

function getcurrentposition(position) {
  console.log(navigator.geolocation.getCurrentPosition);
  navigator.geolocation.getCurrentPosition(getAxiosforplace);
}

let currentLocationbutton = document.querySelector("#currentLocationButton-h");
currentLocationbutton.addEventListener("click", getcurrentposition);

//selecting London

function selectLondon(london) {
  let city = "London";
  getAxios(city);
}
let londonchoice = document.querySelector("#london-h");
londonchoice.addEventListener("click", selectLondon);

//selecting Paris
function selectParis(Paris) {
  let city = "Paris";
  getAxios(city);
}
let parischoice = document.querySelector("#paris-h");
parischoice.addEventListener("click", selectParis);

//selecting vancouver

function selectVan(Van) {
  let city = "Vancouver";
  getAxios(city);
}
let vancouverchoice = document.querySelector("#vancouver-h");
vancouverchoice.addEventListener("click", selectVan);
