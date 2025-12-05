import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AnnouncementBanner() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  if (!settings) return null;

  const enabled = Number(settings.announcement_enabled) === 1;
  if (!enabled) return null;

  return (
    <div
      className="w-full text-center py-3 font-semibold shadow-md"
      style={{
        backgroundColor: settings.announcement_bg || "#1f2937",
        color: settings.announcement_color || "#ffffff"
      }}
    >
      {settings.announcement_text || ""}
    </div>
  );
}
