import { getUserById } from "../models/userProfile.js";

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is set by authenticateToken middleware
    const userId = req.user.userId;
    
    const user = await getUserById(userId);
    
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: { user },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Verify token validity
 */
export const verifyTokenEndpoint = (req, res) => {
  // If we reach here, token is valid (middleware already verified it)
  res.status(200).json({
    success: true,
    message: "Token is valid",
    data: {
      user: {
        userId: req.user.userId,
        email: req.user.email,
      },
    },
  });
};
