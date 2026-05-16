const baseUrl = "http://localhost:3001";

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

export function register({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
