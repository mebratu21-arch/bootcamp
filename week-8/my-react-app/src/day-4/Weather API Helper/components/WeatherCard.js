// components/WeatherCard.js
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function WeatherCard({ data, onFavorite }) {
  return (
    <Card style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5">{data.name}</Typography>
        <Typography>Temperature: {data.main.temp}°C</Typography>
        <Typography>Condition: {data.weather[0].description}</Typography>

        <Button
          variant="outlined"
          style={{ marginTop: "10px" }}
          onClick={() => onFavorite(data.name)}
        >
          Add to Favorites
        </Button>
      </CardContent>
    </Card>
  );
}
