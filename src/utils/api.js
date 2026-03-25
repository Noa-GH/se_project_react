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
  // console.log("API Response:", response.status, response.statusText);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch items (status ${response.status}) ${response.statusText}`);
  }
  
  // DELETE requests typically return 204 No Content or 200 OK with empty body
  if (response.status === 204) {
    console.log("Successful response (no content expected)");
    return null;
  }

  return response.json();
}

// GET /items
export function getItems() {
  console.log("Fetching from:", `${baseUrl}/items`);
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .catch((error) => {
      console.error("Error fetching items:", error);
      throw error;
    });
}

// POST /items
export function addItem({ name, imageUrl, weather }) {
  console.log("Adding item:", { name, imageUrl, weather });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// DELETE /items/:id
export function deleteItem(id) {
  console.log(`Deleting item with ID: ${id} (type: ${typeof id})`);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log("Delete response received:", response.status);
      return checkResponse(response);
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
}

// PATCH /items/:id
export function updateItem(id, { name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}