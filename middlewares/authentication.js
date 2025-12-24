import { validateToken } from "../services/auth.js";

export const isAuthenticated = (cookieName) => {
  return function (req, res, next) {
    const tokenValue = req.cookies[cookieName];
    if (!tokenValue) return next();

    try {
      const userPayload = validateToken(tokenValue);
      req.user = userPayload;
    } catch (err) {}
    return next();
  };
};
