// The utils files also contain API coordinates and key for fetching weather data
const coordinates = {
  latitude: 38.777,
  longitude: -77.663,
};

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.WeatherGCPServer.jumpingcrab.com"
    : "http://localhost:3001";

const apiKey = "ae6330cd4fbc32f1172753d6a6a5f7ec";

export { coordinates, baseUrl, apiKey };
