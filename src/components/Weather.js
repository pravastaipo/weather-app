import { useState } from 'react';
import '../App.css';
import Axios from 'axios';
import { humidity, location, wind, notFound, search, cloud, clear, rain, snow, mist } from '../assets';

const Weather = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false)
  const [data, setData] = useState({
    celcius: 273,
    desc: 'Input City Name',
    hmdty: 0,
    speed: 0,
    image: notFound,
  });

  /* 
    link API by city name
    https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={APIkey}
  */

  const handleClick = async () => {
    if (name !== '') {
      try {
        const res = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c2395c4215ca0b9df1ce35f289097623`);
        const weatherData = res.data;
        let imagePath;
    
        if (weatherData.weather[0].main = 'clouds') {
          imagePath = cloud;
        } else if (weatherData.weather[0].main = 'clear') {
          imagePath = clear;
        } else if (weatherData.weather[0].main = 'rain') {
          imagePath = rain;
        } else if (weatherData.weather[0].main = 'snow') {
          imagePath = snow;
        } else if (weatherData.weather[0].main = 'mist') {
          imagePath = mist;
        }
    
        console.log(weatherData); // Optional
    
        setData({
          ...data,
          celcius: weatherData.main.temp,
          desc: weatherData.weather[0].description,
          hmdty: weatherData.main.humidity,
          speed: weatherData.wind.speed,
          image: imagePath
        });
      } catch (err) {
        if(err.response.status == 404) {
          setError((prev) => !prev)
          console.error(err);
        }
      }
    }
  
  };

 

  return (
    <div className="weather__card">
      <section className="search__section">
        <img src={location} alt="location" />
        <input
          type="text"
          placeholder="Enter Your Location"
          onChange={(e) => setName(e.target.value)}
          className="location__input"
        />
        <img 
          src={search} 
          alt="search" 
          className="search__btn" 
          onClick={handleClick} 
        />
      </section>

      <section className="weather__section">
        <img src={error ? notFound : data.image} alt="weather" />
        <h1 className="temperature">{error ? '' : Math.round(data.celcius - 273.15)}<span style={{fontSize: '15px'}}>°c</span></h1>
        <p className="description">{error? "City Doesn't Exist" : data.desc}</p>
      </section>

      <section className="details__section">
        <div className="humidity">
          <img src={humidity} alt="humidity" />
          <div className="text">
            <span>{error ? '' : Math.round(data.hmdty)}%</span>
            <p>humidity</p>
          </div>
        </div>

        <div className="wind">
          <img src={wind} alt="wind" />
          <div className="text">
            <span>{error ? '' : Math.round(data.speed)}m/s</span>
            <p>wind speed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Weather;
