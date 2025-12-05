import express from "express";
import { db } from "../db.js";
import { authRequired, ownerOnly } from "../middleware/auth.js";

const router = express.Router();

// GET SETTINGS
router.get("/", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings WHERE id = 1").get();
    res.json(settings);
});

// UPDATE SETTINGS (OWNER ONLY)
router.post("/", authRequired, ownerOnly, (req, res) => {
    const { logo_url, footer_text, site_title } = req.body;

    db.prepare(`
        UPDATE settings SET
        logo_url = ?,
        footer_text = ?,
        site_title = ?,
        last_updated = CURRENT_TIMESTAMP
        WHERE id = 1
    `).run(
        logo_url ?? "",
        footer_text ?? "",
        site_title ?? "Hideout Crew Community Events"
    );

    res.json({ success: true });
});

export default router;
