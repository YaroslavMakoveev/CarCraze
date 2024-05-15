import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
// import Rating from "./Rating";

function Car({ car }) {
  return (
    <Paper sx={{ maxWidth: 345, margin: "5px" }}>
      <CardActionArea component={Link} to={`/car/${car._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", maxHeight: 140 }}
          image={car.image}
          alt={car.Brand + ' ' + car.Model}
        />
        <CardContent style={{textAlign:"center" }}>
          <Typography gutterBottom variant="h6" component="div">
            {car.Brand + ' ' + car.Model}
          </Typography>
          <Typography variant="h6" component="div">
            {car.Price}₽ {car.Trade_in && <span style={{fontSize: "0.8em"}}>(Trade-in)</span>}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Car;
