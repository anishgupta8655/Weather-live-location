// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=f50be1631fa9988bca8403a2316ff834`
// );
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const form = document.querySelector("#form");
const inp = document.querySelector("#inp");
const img = document.querySelector("#img");
const cloud = document.querySelector("#cloud");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");

async function apiCall(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f50be1631fa9988bca8403a2316ff834`
    );
    let result = await response.json();
    console.log(result);
    return displayData(result);
  } catch (e) {
    console.log(e);
  }
}
////location allow home page code
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // console.log(latitude, longitude);
    getCurrentLocation(latitude, longitude);
  },
  (err) => {
    console.log(e);
  }
);
//////////////////////////////////////////////////////////

/////code for current location

async function getCurrentLocation(a, b) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=f50be1631fa9988bca8403a2316ff834`
    );
    let result = await response.json();
    //   console.log(result);
    if (result) return displayData(result);
  } catch (e) {
    console.log(e);
  }
}

function displayData(data) {
  city.textContent = data.name;
  cloud.textContent = data.weather[0].description;
  temp.textContent = Math.round(data.main.temp) - 273 + "°C";
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  apiCall(inp.value);
  //getLocation();
  //   console.log(inp.value);
});
