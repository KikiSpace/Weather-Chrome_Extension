const OPEN_WEATHER_API_KEY = "88206fe451bca43d80b5a9b6e836c95a";

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

export async function fetchOpenWeatherData(
  city: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("City not found");
  }

  const data: OpenWeatherData = await res.json();
  return data;
}
