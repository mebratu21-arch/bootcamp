// pages/FavoritesPage.js
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Card, CardContent, Button, Typography } from "@mui/material";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.length === 0 && <p>No favorites yet.</p>}

      {favorites.map((city) => (
        <Card key={city} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{city}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeFavorite(city)}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
