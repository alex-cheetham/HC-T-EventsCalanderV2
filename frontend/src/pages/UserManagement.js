import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "EVENT_MANAGER"
  });

  const token = JSON.parse(localStorage.getItem("user")).token;

  const loadUsers = async () => {
    const res = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(await res.json());
  };

  useEffect(() => loadUsers(), []);

  const createUser = async () => {
    await fetch(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newUser)
    });
    loadUsers();
    alert("User created!");
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadUsers();
  };

  const updateRole = async (id, role) => {
    await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">User Management</h1>

        {/* Create User */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

          <input
            placeholder="Username"
            className="w-full p-3 bg-gray-800 rounded-lg mb-4"
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full p-3 bg-gray-800 rounded-lg mb-4"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <select
            className="w-full p-3 bg-gray-800 rounded-lg mb-4"
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
          >
            <option value="EVENT_MANAGER">Event Manager</option>
            <option value="DEVELOPER">Developer</option>
            <option value="OWNER">Owner</option>
          </select>

          <button
            onClick={createUser}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            Create User
          </button>
        </div>

        {/* User List */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Users</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">ID</th>
                <th className="p-3">Username</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-800">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.role}</td>

                  <td className="p-3 flex gap-4">

                    <select
                      className="bg-gray-800 rounded-lg px-3 py-1"
                      value={u.role}
                      onChange={(e) =>
                        updateRole(u.id, e.target.value)
                      }
                    >
                      <option value="EVENT_MANAGER">Event Manager</option>
                      <option value="DEVELOPER">Developer</option>
                      <option value="OWNER">Owner</option>
                    </select>

                    <button
                      className="text-red-500 hover:text-red-300"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
