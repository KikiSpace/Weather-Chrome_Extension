import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Box, Grid, InputBase, IconButton, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { setStoredCities, getStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);

  const [cityInput, setCityInput] = useState<string>("");

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
  });

  const handleCityButtonClick = () => {
    if (cityInput === "") return;
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };
  const onKeyDownEnter = (e) => {
    if (e.keyCode === 13) {
      handleCityButtonClick();
    }
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    setStoredCities([...cities]).then(() => setCities([...cities]));
  };

  return (
    <Box className="box" mx="8px" my="16px">
      <Grid container mx="4px">
        <Paper className="paper">
          <InputBase
            className="inputBase"
            placeholder="San Francisco"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            onKeyDown={onKeyDownEnter}
          />
          <IconButton className="addIcon" onClick={handleCityButtonClick}>
            <AddIcon />
          </IconButton>
        </Paper>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
