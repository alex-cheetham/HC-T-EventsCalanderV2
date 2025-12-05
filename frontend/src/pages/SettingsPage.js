import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  const save = async () => {
    const result = await api.updateSettings(settings);
    if (result.success) alert("Settings Updated!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-xl p-10 rounded-xl border border-gray-800 shadow-xl">
        
        <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

        {/* Site Title */}
        <label className="block mb-1 font-semibold">Site Title</label>
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-6"
          value={settings.site_title}
          onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
        />

        {/* Logo URL */}
        <label className="block mb-1 font-semibold">Logo URL</label>
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-6"
          value={settings.logo_url}
          onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
        />

        {/* Footer Text */}
        <label className="block mb-1 font-semibold">Footer Text</label>
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-6"
          value={settings.footer_text}
          onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
        />

        <hr className="border-gray-700 my-8" />

        {/* ========================
            ANNOUNCEMENT BANNER
        ======================== */}
        <h2 className="text-2xl font-bold mb-4">Announcement Banner</h2>

        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={settings.announcement_enabled === 1}
            onChange={(e) =>
              setSettings({
                ...settings,
                announcement_enabled: e.target.checked ? 1 : 0
              })
            }
          />
          <span className="font-semibold">Enable Banner</span>
        </label>

        {/* Banner Text */}
        <label className="block mb-1 font-semibold">Banner Message</label>
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-6"
          value={settings.announcement_text}
          onChange={(e) =>
            setSettings({ ...settings, announcement_text: e.target.value })
          }
        />

        {/* Color Pickers */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">Background Color</label>
            <input
              type="color"
              className="w-full h-12 rounded-lg"
              value={settings.announcement_bg}
              onChange={(e) =>
                setSettings({ ...settings, announcement_bg: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Text Color</label>
            <input
              type="color"
              className="w-full h-12 rounded-lg"
              value={settings.announcement_color}
              onChange={(e) =>
                setSettings({ ...settings, announcement_color: e.target.value })
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={save}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
