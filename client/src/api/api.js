// A small helper so we don't repeat fetch() code everywhere.
// It automatically adds the base URL and the login token (if we have one).

const BASE_URL = "http://localhost:5000/api";

async function request(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if we have a token, send it so protected routes work
  if (token) {
    options.headers["Authorization"] = "Bearer " + token;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_URL + endpoint, options);
  const data = await response.json();

  if (!response.ok) {
    // throw so the calling page can catch it and show an error message
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// simple named helpers, easier to read in the pages
export const api = {
  get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, body) => request(endpoint, "POST", body),
  put: (endpoint, body) => request(endpoint, "PUT", body),
  delete: (endpoint) => request(endpoint, "DELETE"),
};
