import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const api_key = "62ae0afa232b5b9c352996fe61995b86";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${url}?q=${city}&appid=${api_key}&units=metric`
      );
      let jsonRes = await response.json();

      let result = {
        city: city,
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
      };
      return result;
    } catch (error) {
      throw new err();
    }
  };

  let handleChnage = (e) => setCity(e.target.value);

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="searchBox">
      <form action="" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          value={city}
          onChange={handleChnage}
          required
        />
        <br />
        <br />
        <Button type="submit" variant="contained">
          Send
        </Button>
        {error && <p style={{ color: "red" }}> No such place exists!</p>}
      </form>
    </div>
  );
}
