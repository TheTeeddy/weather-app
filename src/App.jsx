import { useState } from "react";
import Form from "./components/Form/Form";
import Location from "./components/LocationInfo/Location";
import Error from "./components/Error";
import "./app.css";
import Loading from "./components/Loading";

export default function App() {
  const [isCityFounded, setIsCityFounded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState({
    name: "",
    temperature: 0,
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
  });


  const updateCity = (newCity, cityFound = true) => {
    setCity(newCity);
    setIsCityFounded(cityFound)
  };

  return (
    <div className="app">
      <Form setCity={updateCity} setLoading={setLoading} /> 
      {loading ? <Loading/> : city.name.trim() && <Location city={city} /> }
      {/* {city.name.trim() && <Location city={city} /> }  */}
      {!isCityFounded && <Error/>}
      
    </div>
  );
}
