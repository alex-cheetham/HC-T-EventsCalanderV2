import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();

// -------------------------------------
// GET ALL USERS (OWNER ONLY)
// -------------------------------------
router.get(
  "/",
  authRequired,
  requireRole("OWNER"),
  (req, res) => {
    const users = db.prepare(`
      SELECT id, username, role, created_at
      FROM users
      ORDER BY created_at DESC
    `).all();

    res.json(users);
  }
);

// -------------------------------------
// CREATE USER (OWNER ONLY)
// -------------------------------------
router.post(
  "/create",
  authRequired,
  requireRole("OWNER"),
  (req, res) => {
    const { username, password, role } = req.body;

    const hashed = bcrypt.hashSync(password, 12);

    const result = db.prepare(
      "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)"
    ).run(username, hashed, role);

    res.json({ success: true, id: result.lastInsertRowid });
  }
);

// -------------------------------------
// DELETE USER (OWNER ONLY)
// -------------------------------------
router.delete(
  "/:id",
  authRequired,
  requireRole("OWNER"),
  (req, res) => {
    db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  }
);

export default router;
