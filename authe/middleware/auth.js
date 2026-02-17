import { verifyToken } from "../utils/jwt.js";

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 */
export const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Attach user data to request
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't block request
 */
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Continue without user data
    next();
  }
};
