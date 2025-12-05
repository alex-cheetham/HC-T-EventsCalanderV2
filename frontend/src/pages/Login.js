import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = await api.login(username, password);

    if (!data.success) {
      setError(data.error || "Invalid login");
      return;
    }

    login(data);

    // Redirect based on role
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 p-10 rounded-xl border border-gray-800 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Team Login</h1>

        {error && (
          <div className="text-red-400 bg-red-900/20 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="px-4 py-3 bg-gray-800 rounded-lg border border-gray-700"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="px-4 py-3 bg-gray-800 rounded-lg border border-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
