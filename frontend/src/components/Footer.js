import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Footer() {
  const [text, setText] = useState("");

  useEffect(() => {
    api.getSettings().then((data) => {
      setText(data.footer_text || "");
    });
  }, []);

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-center py-6 text-gray-400">
      {text || `© ${new Date().getFullYear()} HCC Development Team`}
    </footer>
  );
}
