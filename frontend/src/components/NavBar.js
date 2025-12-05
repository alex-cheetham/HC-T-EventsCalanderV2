import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";

export default function NavBar() {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [logo, setLogo] = useState(null);

  // Load logo from settings
  useEffect(() => {
    api.getSettings().then((data) => {
      setLogo(data.logo_url);
    });
  }, []);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-gray-900/70 backdrop-blur border-b border-gray-800 px-6 py-4 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LEFT SIDE — LOGO OR TEXT */}
        <Link to="/" className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt="Site Logo" className="h-10 object-contain" />
          ) : (
            <span className="text-2xl font-bold">HCC Events</span>
          )}
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center text-lg">

          <Link to="/" className="hover:text-blue-400">Events</Link>
          <Link to="/calendar" className="hover:text-blue-400">Calendar</Link>
          <Link to="/login" className="hover:text-blue-400">Team Login</Link>

          {/* Clock */}
          <div className="ml-6 text-right">
            <div className="text-blue-400 font-semibold">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-gray-400 text-sm">
              {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4 border-t border-gray-800 pt-4">

          <Link to="/" onClick={() => setOpen(false)}>Events</Link>
          <Link to="/calendar" onClick={() => setOpen(false)}>Calendar</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Team Login</Link>

        </div>
      )}

    </nav>
  );
}
