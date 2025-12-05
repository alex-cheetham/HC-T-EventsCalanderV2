import express from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    // Use correct column: password_hash
    const valid = bcrypt.compareSync(password, user.password_hash);

    if (!valid) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    // Issue JWT with role included
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        success: true,
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    });
});

export default router;
