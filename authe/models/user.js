import { dbneon } from "../config/neondb.js";
import bcrypt from "bcrypt";

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Created user (without password)
 */
export const registerUser = async (email, password) => {
  const trx = await dbneon.transaction();
  try {
    // Hash password with salt rounds of 10
    const hashPassword = await bcrypt.hash(password + "", 10);

    // Insert user into database
    const [user] = await trx("users").insert(
      {
        email: email.toLowerCase(),
        password: hashPassword,
      },
      ["email", "id"]
    );

    await trx.commit();

    return user;
  } catch (error) {
    await trx.rollback();
    console.error("Error in registerUser:", error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User object (without password)
 * @throws {Error} If credentials are invalid
 */
export const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await dbneon("users")
      .where({ email: email.toLowerCase() })
      .first();

    // Check if user exists
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password + "", user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};