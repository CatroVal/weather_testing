const api = {
   key: '7f49e4275cce71bd07587f11ef0d22f0',
   base: 'https://api.openweathermap.org/data/2.5/'
};

const searchbar = document.querySelector('#search-bar');
searchbar.addEventListener("keypress", setQuery);

function setQuery(event) {
   if(event.keyCode == 13) { //keyCode == 13 hace referencia a la tecla Enter
      getResults(searchbar.value);
      //console.log(searchbar.value);
   }
}

function getResults(query) {
   fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(weather => {
         return weather.json();
      }).then(displayResults);
}

function displayResults(weather) {
   console.log(weather);
   //Ciudad
   let city = document.querySelector('.location .city');
   city.innerText = `${weather.name}, ${weather.sys.country}`;
   //Fecha
   let now = new Date();
   let date = document.querySelector('.location .date');
   date.innerText = dateBuilder(now);
   //Temperatura
   let temp = document.querySelector('.current .temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
   //Descripcion del clima
   let weather_element = document.querySelector('.current .weather');
   weather_element.innerText = weather.weather[0].main;
   //Minima y maxima
   let minMax = document.querySelector('.current .min-max');
   minMax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

   //Cambio de fondo
   let remoteDate = new Date(weather.dt * 1000 + (weather.timezone * 1000)).getUTCHours();
   if(remoteDate >= 6 && remoteDate < 9) {
      document.body.style.backgroundImage = "url('images/dawn.jpg')";
   } else if(remoteDate >= 9 && remoteDate < 18) {
      document.body.style.backgroundImage = "url('images/day.jpg')";
   } else if(remoteDate >= 18 && remoteDate < 20) {
      document.body.style.backgroundImage = "url('images/sunset.jpg')";
   } else {
      document.body.style.backgroundImage = "url('images/night.png')";
   }

   //Cambio de icono
   let icon = document.getElementById("icon");
   if(weather.weather[0].main == 'Clouds') {
      icon.src = 'images/clouds-icon.png';
   } else if(weather.weather[0].main == 'Clear') {
      icon.src = 'images/clear-icon.png';
   } else if(weather.weather[0].main == 'Rain') {
      icon.src = 'images/rain-icon.png';
   } else if(weather.weather[0].main == 'Snow') {
      icon.src = 'images/snow-icon.png';
   } else if(weather.weather[0].main == 'Thunderstorm') {
      icon.src = 'images/storm-icon.png';
   }

}

function dateBuilder(d) {
   let months = ["January", "February", "March", "April", "May", "June", "July", "August",
                  "September", "October", "November", "December"];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();

   return `${day}, ${date} ${month}, ${year}`;
}
