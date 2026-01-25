import { registerUser, loginUser } from "../models/user.js";
import { generateToken } from "../utils/jwt.js";


/**
 * Register a new user
 */
export const register = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await registerUser(email, password);
    
    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email });
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle duplicate email error (PostgreSQL unique constraint violation)
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: `Email ${email} already exists`,
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await loginUser(email, password);
    
    // Generate JWT token
    const token = generateToken({ userId: user.id, email: user.email });
    
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    
    // Handle authentication errors
    if (error.statusCode === 401) {
      return res.status(401).json({
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