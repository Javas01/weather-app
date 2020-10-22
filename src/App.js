import React, { useState } from 'react';
 
const api = {
  key: '3c92ce14da75a244b4feba5e4841540b',
  base: 'https://api.openweathermap.org/data/2.5/weather'
}
const api2 = {
  key: 'e8c6ec8ca27a4d39a1860a1c5db2d2e1',
  base: 'https://api.weatherbit.io/v2.0/current'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [weather2, setWeather2] = useState({})

  const search = e => {
    if(e.key === "Enter"){
      fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
      fetch(`${api2.base}?city=${query}&key=${api2.key}`)
        .then(resp => resp.json())
        .then(data => {
          setWeather2(data)
          console.log(data)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type='text' 
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main === "undefined" || typeof weather2.data === "undefined") ? (
          <div></div>
        ) : ( 
          <div>
            <div className="location-box">
              <div className="location">{weather2.data[0].city_name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
