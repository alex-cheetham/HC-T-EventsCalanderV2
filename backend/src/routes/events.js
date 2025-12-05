import express from "express";
import { db } from "../db.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();

// -------------------------------------
// GET ALL EVENTS (public + admin)
// -------------------------------------
router.get("/", (req, res) => {
  const events = db.prepare(`
      SELECT * FROM events ORDER BY event_date ASC, meetup_time ASC
  `).all();
  res.json(events);
});

// -------------------------------------
// GET FEATURED EVENTS
// -------------------------------------
router.get("/featured/list", (req, res) => {
  const featured = db.prepare(`
      SELECT * FROM events 
      WHERE is_featured = 1
      ORDER BY event_date ASC, meetup_time ASC
  `).all();
  res.json(featured);
});

// -------------------------------------
// GET SINGLE EVENT
// -------------------------------------
router.get("/:id", (req, res) => {
  const event = db.prepare("SELECT * FROM events WHERE id = ?").get(req.params.id);

  if (!event) return res.status(404).json({ error: "Event not found" });

  res.json(event);
});

// -------------------------------------
// CREATE EVENT (Owner / Dev / Manager)
// -------------------------------------
router.post(
  "/",
  authRequired,
  requireRole("OWNER", "DEVELOPER", "EVENT_MANAGER"),
  (req, res) => {
    const {
      title,
      description,
      location,
      event_date,
      meetup_time,
      departure_time,
      banner_url,
      category,
      is_featured
    } = req.body;

    // EVENT MANAGERS CANNOT FEATURE EVENTS
    const featuredValue =
      (req.user.role === "OWNER" || req.user.role === "DEVELOPER")
        ? (is_featured ? 1 : 0)
        : 0;

    const result = db
      .prepare(`
        INSERT INTO events 
        (title, description, location, event_date, meetup_time, departure_time,
         banner_url, category, is_featured, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        title,
        description,
        location,
        event_date,
        meetup_time,
        departure_time,
        banner_url,
        category ?? "General",
        featuredValue,
        req.user.id
      );

    res.json({ success: true, id: result.lastInsertRowid });
  }
);

// -------------------------------------
// UPDATE EVENT
// -------------------------------------
router.put(
  "/:id",
  authRequired,
  requireRole("OWNER", "DEVELOPER", "EVENT_MANAGER"),
  (req, res) => {
    const {
      title,
      description,
      location,
      event_date,
      meetup_time,
      departure_time,
      banner_url,
      category,
      is_featured
    } = req.body;

    // EVENT MANAGERS cannot mark featured
    const featuredValue =
      (req.user.role === "OWNER" || req.user.role === "DEVELOPER")
        ? (is_featured ? 1 : 0)
        : 0;

    db.prepare(
      `
      UPDATE events SET
      title = ?, description = ?, location = ?, event_date = ?, 
      meetup_time = ?, departure_time = ?, banner_url = ?,
      category = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    ).run(
      title,
      description,
      location,
      event_date,
      meetup_time,
      departure_time,
      banner_url,
      category ?? "General",
      featuredValue,
      req.params.id
    );

    res.json({ success: true });
  }
);

// -------------------------------------
// DELETE EVENT (Owner / Developer ONLY)
// -------------------------------------
router.delete(
  "/:id",
  authRequired,
  requireRole("OWNER", "DEVELOPER"),
  (req, res) => {
    db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  }
);

export default router;
