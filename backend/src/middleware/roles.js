export function roleRequired(roles = []) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ error: "Authentication required" });

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

export function ownerOnly(req, res, next) {
  if (!req.user || req.user.role !== "OWNER") {
    return res.status(403).json({ error: "Owner access required" });
  }
  next();
}
