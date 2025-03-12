import { useState } from 'react';
import { OPENWEATHER_API, TIME_API } from '../../utils/api';

import './Form.css';

const Form = ({ setCity, setLoading }) => {
  const [location, setLocation] = useState('');

  const searchLocation = e => {
    if (e.key === 'Enter') {
      setLoading(true);

      const cityInfo = {
        name: '',
        temperature: 0,
        feelsLike: 0,
        humidity: 0,
        windSpeed: 0,
        lon: 0,
        lat: 0,
        time: '',
      };

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API}&units=metric`
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(`Oops! We can't find this location: ${location}`);
          }
          return res.json();
        })
        .then(data => {
          cityInfo.name = data.name;
          cityInfo.temperature = data.main.temp;
          cityInfo.feelsLike = data.main.feels_like;
          cityInfo.humidity = data.main.humidity;
          cityInfo.windSpeed = data.wind.speed;
          cityInfo.lon = data.coord.lon;
          cityInfo.lat = data.coord.lat;

          return cityInfo;
        })
        .then(res => {
          fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${res.lat}&lon=${res.lon}&format=json&apiKey=${TIME_API}`
          )
            .then(res => res.json())
            .then(data => {
              const now = new Date();
              const locationTime = now.toLocaleString('ro-RO', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: data.results[0].timezone.name,
              });
              return {
                ...cityInfo,
                time: locationTime,
              };
            })
            .then(data => {
              setCity(data);
              setLoading(false);
            });
        })
        .catch(err => {
          console.error(err.message);
          setCity({
            name: '',
            temperature: 0,
            feelsLike: 0,
            humidity: 0,
            windSpeed: 0,
          });
          setLoading(false);
        })
        .finally(() => {
          setLocation('');
        });
    }
  };

  return (
    <form className="form" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        autoComplete="off"
        value={location}
        name="search"
        placeholder="Enter Location"
        onChange={e => setLocation(e.target.value)}
        onKeyUp={searchLocation}
      />
    </form>
  );
};

export default Form;
