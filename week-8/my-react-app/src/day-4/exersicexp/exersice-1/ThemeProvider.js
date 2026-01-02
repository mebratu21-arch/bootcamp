// ThemeProvider.js
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#222222",
          color: theme === "light" ? "#000000" : "#ffffff",
          minHeight: "100vh",
          padding: "20px",
          transition: "0.3s ease"
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
