import express from "express";
import { db } from "../db.js";
import { authRequired, devOnly } from "../middleware/auth.js";

const router = express.Router();

// Allow OWNER and DEVELOPER to view analytics
const analyticsAccess = [authRequired, devOnly];


// -------------------------------------------
// EVENTS PER MONTH
// -------------------------------------------
router.get("/events-per-month", analyticsAccess, (req, res) => {
  const result = db.prepare(`
    SELECT 
      strftime('%Y', event_date) AS year,
      strftime('%m', event_date) AS month,
      COUNT(*) AS count
    FROM events
    GROUP BY year, month
    ORDER BY year, month
  `).all();

  res.json(result);
});

// -------------------------------------------
// CATEGORY DISTRIBUTION
// -------------------------------------------
router.get("/category-distribution", analyticsAccess, (req, res) => {
  const result = db.prepare(`
    SELECT 
      category,
      COUNT(*) AS count
    FROM events
    GROUP BY category
  `).all();

  res.json(result);
});

// -------------------------------------------
// FEATURED EVENTS COUNT
// -------------------------------------------
router.get("/featured-breakdown", analyticsAccess, (req, res) => {
  const result = db.prepare(`
    SELECT
      SUM(CASE WHEN is_featured = 1 THEN 1 ELSE 0 END) AS featured,
      SUM(CASE WHEN is_featured = 0 THEN 1 ELSE 0 END) AS normal
    FROM events
  `).get();

  res.json(result);
});

// -------------------------------------------
// KPI SUMMARY
// -------------------------------------------
router.get("/kpi", analyticsAccess, (req, res) => {
  const totalEvents = db.prepare(`SELECT COUNT(*) AS total FROM events`).get().total;

  const totalThisMonth = db.prepare(`
    SELECT COUNT(*) AS total 
    FROM events 
    WHERE strftime('%Y-%m', event_date) = strftime('%Y-%m', 'now')
  `).get().total;

  const featured = db.prepare(`SELECT COUNT(*) AS total FROM events WHERE is_featured = 1`).get().total;

  const topCategory = db.prepare(`
    SELECT category, COUNT(*) AS count
    FROM events
    GROUP BY category
    ORDER BY count DESC
    LIMIT 1
  `).get();

  res.json({
    totalEvents,
    totalThisMonth,
    featured,
    topCategory: topCategory?.category || "None"
  });
});

export default router;
