import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

/** Require any logged-in user */
export function authRequired(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // { id, username, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

/** Require one of many roles */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}


export const ownerOnly = (req, res, next) => {
    if (req.user.role !== "OWNER") {
        return res.status(403).json({ error: "Owner access required" });
    }
    next();
};
