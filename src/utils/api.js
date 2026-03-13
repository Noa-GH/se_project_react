// A small API wrapper for OpenWeatherMap.
// This is the source of `getWeatherData` used by App.jsx.

export async function getWeatherData(coordinates, apiKey) {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", coordinates.latitude);
  url.searchParams.set("lon", coordinates.longitude);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "imperial", "metric");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(
      `OpenWeatherMap request failed (status ${response.status})`,
    );
  }

  return response.json();
}
