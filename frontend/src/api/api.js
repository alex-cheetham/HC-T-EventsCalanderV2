import { API_URL } from "../config";

// ------------------------------
// TOKEN HELPER
// ------------------------------
function getToken() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user).token;
}

// ------------------------------
// GENERIC REQUEST HANDLER
// ------------------------------
async function request(path, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  return res.json();
}

// ------------------------------
// API EXPORT
// ------------------------------
export const api = {
  // AUTH
  login: (username, password) =>
    request("/auth/login", "POST", { username, password }),

  // EVENTS
  getEvents: () => request("/events"),
  getEvent: (id) => request(`/events/${id}`),
  getFeaturedEvents: () => request("/events/featured/list"),

  createEvent: (event) => request("/events", "POST", event, true),
  updateEvent: (id, event) => request(`/events/${id}`, "PUT", event, true),
  deleteEvent: (id) => request(`/events/${id}`, "DELETE", null, true),

  // SETTINGS (Owner & Dev)
  getSettings: () => request("/settings"),
  updateSettings: (settings) =>
    request("/settings", "POST", settings, true),

  // USER MANAGEMENT (Owner)
  getUsers: () => request("/users", "GET", null, true),
  createUser: (user) => request("/users/create", "POST", user, true),
  updateUserRole: (id, role) =>
    request(`/users/${id}/role`, "PUT", { role }, true),
  deleteUser: (id) => request(`/users/${id}`, "DELETE", null, true),
};
