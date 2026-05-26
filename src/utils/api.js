// =============================================
// Imports
// =============================================

import { baseUrl } from "../utils/constants";

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
    throw new Error(
      `OpenWeatherMap request failed (status ${response.status})`,
    );
  }
  return response.json();
}

// =============================================
// Clothing Items API (json-server)
// =============================================

function checkResponse(response) {
  if (!response.ok) {
    throw new Error(
      `Failed to fetch items (status ${response.status}) ${response.statusText}`,
    );
  }

  // DELETE requests typically return 204 No Content or 200 OK with empty body
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Unprotected (Public use)

// GET /items
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// Protected Requests (Requires Token)

// POST /items
export function addItem({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// DELETE /items/:id
export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return checkResponse(response);
  });
}

// PATCH /items/:id
export function updateItem(id, { name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// PATCH /user/me
export function updateCurrentUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
