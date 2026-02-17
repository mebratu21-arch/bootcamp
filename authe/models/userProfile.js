import { dbneon } from "../config/neondb.js";

/**
 * Get user profile by ID
 * @param {number} userId - User ID
 * @returns {Object} User profile without password
 */
export const getUserById = async (userId) => {
  try {
    const user = await dbneon("users")
      .where({ id: userId })
      .select("id", "email", "created_at")
      .first();

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};
