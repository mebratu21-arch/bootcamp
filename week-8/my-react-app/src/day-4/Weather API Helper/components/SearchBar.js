// components/SearchBar.js
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <TextField
        label="Search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSearch(city)}>
        Search
      </Button>
    </div>
  );
}
