import './App.css';
import React, { useState, useEffect } from 'react';

const api = {
  key: '7fa234486ecdfaba2a3369309c328a6b',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherData, setWeatherData] = useState(null);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((results) => {
        setWeather(results);
        console.log(results)
        // Move setWeatherData to this point
        setWeatherData([
          {
            key: 'name',
            label: 'County & City',
            value: results.name,
          },
          {
            key: 'temp',
            label: 'Temperature',
            value: `min: ${results.main.temp_min}°C, max: ${results.main.temp_max}°C`,
          },
          {
            key: 'wind',
            label: 'Wind',
            value: `Vitesse : ${results.wind.speed} , Degree : ${results.wind.deg}`,
          },
          {
            key: 'description',
            label: 'Description',
            value: `${results.weather[0].description} / (${results.weather[0].main})`,
          },
          
        ]);
      });
  };

  // Use useEffect to update weatherData when weather changes
  useEffect(() => {
    if (typeof weather.main !== 'undefined') {
      setWeatherData([
        {
          key: 'name',
          label: 'Country or City',
          value: weather.name,
        },
        {
          key: 'temp',
          label: 'Temperature',
          value: `min: ${weather.main.temp_min}°C, max: ${weather.main.temp_max}°C`,
        },
        {
            key: 'wind',
            label: 'Wind',
            value: `Vitesse : ${weather.wind.speed} , degree : ${weather.wind.deg}`,
        },
        {
          key: 'description',
          label: 'Description',
          value: `${weather.weather[0].description} / (${weather.weather[0].main})`,
        },
        
      ]);
    } 
    else {
     setWeatherData(
      ""
    );

    }
  }, [weather]);

  return (
    <>
    <div  className="componentContainer" >
       <h2 className="weatherTitle">Meteorify</h2>

      <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by Country or City..."
            onChange={(e) => setSearch(e.target.value)}
            className="inputField"
          />
          <button onClick={searchPressed} className="button">
            Search
          </button>
          <br/><br/><br/>
      </div>


      {weatherData ? (

        <div className="container">
          {weatherData.map((item) => (
            <div key={item.key} className="item">
              <h3 className="label">{item.label}</h3>
              <p className="value">{item.value}</p>
            </div>
          ))}
        </div>

      ) : (
        <p className="noData">No weather data available.</p>

      )}


      {/*Footer*/}
      <footer>
          <p className='footer-app'>Please contact <a href='https://www.facebook.com/claudio.andrinyaina' target="_blank" rel="noopener noreferrer">Claudio Andrian</a> for support.</p>
      </footer>

    </div>


    </>
  );
}

export default App;
