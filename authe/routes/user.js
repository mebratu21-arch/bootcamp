import express from "express";
import { getProfile, verifyTokenEndpoint } from "../controller/userProfile.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   GET /api/user/profile
 * @desc    Get current user profile
 * @access  Protected
 */
router.get("/profile", authenticateToken, getProfile);

/**
 * @route   GET /api/user/verify
 * @desc    Verify token validity
 * @access  Protected
 */
router.get("/verify", authenticateToken, verifyTokenEndpoint);

export default router;
