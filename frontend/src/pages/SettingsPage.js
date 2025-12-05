import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    logo_url: "",
    footer_text: "",
    site_title: ""
  });

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    const result = await api.updateSettings(settings);

    if (result.success) alert("Settings Updated!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-xl p-10 rounded-xl border border-gray-800 shadow-xl">
        
        <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

        {/* Site Title */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Site Title</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            value={settings.site_title}
            onChange={(e) =>
              setSettings({ ...settings, site_title: e.target.value })
            }
          />
        </div>

        {/* Logo URL */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Logo URL</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            value={settings.logo_url}
            onChange={(e) =>
              setSettings({ ...settings, logo_url: e.target.value })
            }
          />
        </div>

        {/* Footer Text */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Footer Text</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
            value={settings.footer_text}
            onChange={(e) =>
              setSettings({ ...settings, footer_text: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
