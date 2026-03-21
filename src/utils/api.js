// =============================================
// OpenWeatherMap API
// =============================================

export async function getWeatherData(coordinates, apiKey) {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", coordinates.latitude);
  url.searchParams.set("lon", coordinates.longitude);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "imperial");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`OpenWeatherMap request failed (status ${response.status})`);
  }
  return response.json();
}

// =============================================
// Clothing Items API (json-server)
// =============================================

const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Failed to fetch items (status ${response.status}) ${response.statusText}`);
  }
  return response.json();
}

// GET /items
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// POST /items
export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// DELETE /items/:id
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

// PATCH /items/:id
export function updateItem(id, { name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}