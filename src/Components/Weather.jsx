import './App.css'
import React, { useState, useEffect } from 'react';

const api = {
  key: '7fa234486ecdfaba2a3369309c328a6b',
  base: 'https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=',
};
function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api.key}&units=imperial`)

     .then((res) => res.json())
     .then((results) => {
        setWeather(results);
        console.log(results);
     });
  };

  return (
    <>
      <h1>Want to know the Weather in your country?</h1>

      <input  type="text" placeholder="Search by County/Town..." onChange={(e)=>setSearch(e.target.value)} />   
      <button onClick={searchPressed}>Search</button>

      {
        typeof weather.main!="undefined" ? 
            <div>
                Nom: {weather.name}
                <br />
                Pressure: {weather.main.pressure}
                <br />
                Longitude: {weather.coord.lon}
                <br />
                Latitude: {weather.coord.lat}
            </div>
          : (
          ""
          )
      }

    </>
  )
}

export default App