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
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6">

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-10 rounded-2xl w-full max-w-md">
        
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Team Login
        </h1>

        {error && (
          <div className="text-red-400 bg-red-900/20 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            className="w-full bg-white/20 border border-white/30 px-4 py-3 rounded-lg 
                       text-white placeholder-gray-300 backdrop-blur-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/20 border border-white/30 px-4 py-3 rounded-lg 
                       text-white placeholder-gray-300 backdrop-blur-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg 
                       font-semibold shadow-lg transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
