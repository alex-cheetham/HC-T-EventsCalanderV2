import { API_URL } from "../config";

export const api = {
  // ---- AUTH ----
  login: async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  // ---- EVENTS ----
  getEvents: async () => (await fetch(`${API_URL}/events`)).json(),
  getEvent: async (id) => (await fetch(`${API_URL}/events/${id}`)).json(),
  getFeaturedEvents: async () => (await fetch(`${API_URL}/events/featured/list`)).json(),

  createEvent: async (token, data) => {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateEvent: async (token, id, data) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteEvent: async (token, id) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // ---- SETTINGS ----
  getSettings: async () => (await fetch(`${API_URL}/settings`)).json(),
  saveSettings: async (token, data) => {
    const res = await fetch(`${API_URL}/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ---- USERS ----
  getUsers: async (token) =>
    (await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })).json(),

  createUser: async (token, data) =>
    (await fetch(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })).json(),

  deleteUser: async (token, id) =>
    (await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })).json(),
};
