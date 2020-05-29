import React, { useEffect, useState } from 'react';
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {

  //openweather apt: receiving object with key "weather"
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lon: null
  });
  const [weatherCondition, setWeatherCondition] = useState({
    condition: null,
    description: null
  });

  function locationSuccess(positionObj) {
    console.log(`${positionObj.coords.latitude}. ${positionObj.coords.longitude}`);
    setCoordinates({
      lat: positionObj.coords.latitude,
      lon: positionObj.coords.longitude
    });
  }

  function locationError(errObj) {
    console.log(`${errObj.code}: ${errObj.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  }, []);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`)
      .then(res => {
        if (res.ok) {
          console.log(res.body);
          return res.json();
        }
      })
      .then(data => {
        console.log(`Data: ${data}`);
        setWeatherCondition({
          condition: data.weather[0].main,
          description: data.weather[0].description
        });
      })
      .catch (err => {
        console.log(err);
      })
  },[coordinates])

  return (
    <section className="App">
      <div>{weatherCondition.condition}</div>
      <div>{weatherCondition.description}</div>
    </section>
  );
}

export default App;
