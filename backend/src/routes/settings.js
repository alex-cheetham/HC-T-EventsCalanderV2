import express from "express";
import { db } from "../db.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();

// GET SETTINGS (public)
router.get("/", (req, res) => {
  const settings = db.prepare("SELECT * FROM settings WHERE id = 1").get();
  res.json(settings);
});

// UPDATE SETTINGS (OWNER + DEVELOPER)
router.post(
  "/",
  authRequired,
  requireRole("OWNER", "DEVELOPER"),
  (req, res) => {
    const { logo_url, footer_text } = req.body;

    db.prepare(
      `
      UPDATE settings 
      SET logo_url = ?, footer_text = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = 1
    `
    ).run(logo_url, footer_text);

    res.json({ success: true });
  }
);

export default router;
