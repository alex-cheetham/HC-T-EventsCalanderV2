import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminNavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login") return null;
  if (!user) return null;

  const isOwner = user.role === "OWNER";
  const isDev = user.role === "DEVELOPER";

  return (
    <nav className="bg-gray-900/90 backdrop-blur border-b border-gray-800 px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">Admin Panel</span>
          <span className="text-sm text-gray-500">({user.role})</span>
        </div>

        <div className="flex items-center gap-8">

          <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>

          {(isOwner || isDev) && (
            <Link to="/admin/settings" className="hover:text-blue-400">Settings</Link>
          )}

          {isOwner && (
            <Link to="/admin/users" className="hover:text-blue-400">Users</Link>
          )}

          <Link to="/" className="hover:text-blue-400">Public Site</Link>

          <button
            onClick={logout}
            className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-500 transition text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
