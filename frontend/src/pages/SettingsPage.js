import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const token = user?.token;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    logo_url: "",
    footer_text: ""
  });

  // Load settings on page load
  useEffect(() => {
    async function load() {
      const data = await api.getSettings();

      setSettings({
        logo_url: data.logo_url || "",
        footer_text: data.footer_text || ""
      });

      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    await api.saveSettings(token, settings);

    setSaving(false);

    alert("Settings updated successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-300 flex items-center justify-center">
        <div className="text-xl opacity-75">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex justify-center">
      <div className="bg-gray-900 p-10 rounded-xl border border-gray-800 w-full max-w-3xl">

        <h1 className="text-4xl font-bold mb-10">Site Settings</h1>

        {/* Logo URL Input */}
        <div className="mb-8">
          <label className="block mb-2 text-lg font-semibold">Header Logo URL</label>
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
            placeholder="https://example.com/logo.png"
            value={settings.logo_url}
            onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
          />
        </div>

        {/* Live Logo Preview */}
        {settings.logo_url && (
          <div className="mb-8">
            <p className="mb-2 text-gray-400 text-sm">Live Logo Preview:</p>
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex justify-center">
              <img
                src={settings.logo_url}
                alt="Logo Preview"
                className="max-h-16 object-contain"
              />
            </div>
          </div>
        )}

        {/* Footer Text */}
        <div className="mb-8">
          <label className="block mb-2 text-lg font-semibold">Footer Text</label>
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
            value={settings.footer_text}
            onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold transition w-full"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

      </div>
    </div>
  );
}
