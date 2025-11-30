/*
 roleMiddleware: checks user roles for endpoint access.
 Accepts array of allowed roles.
*/
const roleMiddleware = (allowed = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const has = req.user.roles.some(r => allowed.includes(r));
    if (!has) return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };
};

// Field-level check (if needed)
const allowFields = (allowedFields = []) => {
  return (req, res, next) => {
    const requestFields = Object.keys(req.body);
    const forbidden = requestFields.filter(f => !allowedFields.includes(f));

    if (forbidden.length > 0) {
      res.status(403);
      throw new Error("You cannot modify restricted fields: " + forbidden.join(", "));
    }

    next();
  };
};

module.exports = { roleMiddleware, allowFields };
