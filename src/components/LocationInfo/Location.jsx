import './Location.css';

const Location = ({ city }) => {
  return (
    <div className="location">
      <div>
        <h3>{city.name}</h3>
        <h1>{Math.floor(city.temperature).toFixed()}&deg;C</h1>
        <h1>{city.time}</h1>
      </div>
      <div className="container">
        <div className="feels">
          <p>{Math.floor(city.feelsLike).toFixed()}&deg;C</p>
          <p>Feels like</p>
        </div>
        <div className="humidity">
          <p>{city.humidity} %</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <p>{city.windSpeed.toFixed()} m/s</p>
          <p>Wind speed</p>
        </div>
      </div>
    </div>
  );
};

export default Location;
