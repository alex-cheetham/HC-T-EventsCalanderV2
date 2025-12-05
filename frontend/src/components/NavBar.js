import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import AnnouncementBanner from "./AnnouncementBanner";

export default function NavBar() {
  const [settings, setSettings] = useState(null);
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  // Load settings + clock
  useEffect(() => {
    api.getSettings().then(setSettings);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!settings) return null;

  // Time formatting
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <>
      {/* Announcement Banner */}
      <AnnouncementBanner />

      <nav className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO + TITLE */}
          <div className="flex items-center gap-4">
            {settings.logo_url && (
              <img
                src={settings.logo_url}
                alt="Site Logo"
                className="h-10 w-auto rounded-lg shadow-md"
              />
            )}

            <span className="text-2xl font-bold tracking-tight text-white">
              {settings.site_title || "Hideout Crew Community Events"}
            </span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10 text-gray-200">

            <Link className="hover:text-blue-400 font-medium" to="/">
              Events
            </Link>

            <Link className="hover:text-blue-400 font-medium" to="/calendar">
              Calendar
            </Link>

            <Link className="hover:text-blue-400 font-medium" to="/login">
              Team Login
            </Link>

            {/* Clock */}
            <div className="text-right ml-6">
              <div className="text-blue-400 font-semibold text-lg">{formattedTime}</div>
              <div className="text-gray-400 text-sm">{formattedDate}</div>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 text-2xl"
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-800 pt-4 flex flex-col gap-4 text-gray-200">

            <Link to="/" className="hover:text-blue-400 text-lg" onClick={() => setMenuOpen(false)}>
              Events
            </Link>

            <Link to="/calendar" className="hover:text-blue-400 text-lg" onClick={() => setMenuOpen(false)}>
              Calendar
            </Link>

            <Link to="/login" className="hover:text-blue-400 text-lg" onClick={() => setMenuOpen(false)}>
              Team Login
            </Link>

            <div className="mt-2">
              <div className="text-blue-400 text-xl font-semibold">{formattedTime}</div>
              <div className="text-gray-400">{formattedDate}</div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
