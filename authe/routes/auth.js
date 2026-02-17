import express from "express";
import { register, login } from "../controller/user.js";
import { validateRegistration, validateLogin, checkValidation } from "../middleware/validation.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/register",
  authLimiter,
  validateRegistration,
  checkValidation,
  register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  "/login",
  authLimiter,
  validateLogin,
  checkValidation,
  login
);

export default router;
