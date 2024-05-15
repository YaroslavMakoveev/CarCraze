// В файле CarCarousel.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CarCarousel({ currentPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cars = useSelector((state) => state.car.carList.cars);

  useEffect(() => {
    setCurrentIndex(0); // Сбрасываем индекс при изменении страницы
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === cars.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [cars]);

  if (!cars || cars.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transitionDuration: "0.9s",
          transform: `translateX(-${currentIndex * 100}%)`, // изменение для отображения только одной машины за раз
        }}
      >
        {cars.map((car, index) => (
          <div
            key={car._id}
            style={{
              flex: "0 0 100%", // изменение для отображения только одной машины за раз
              maxWidth: "100%", // изменение для отображения только одной машины за раз
            }}
          >
            <Link to={`/car/${car._id}`}>
              <img
                src={car.image}
                alt={car.name}
                style={{ width: "80%", height: "70%" }}
              />
              <div
                style={{
                  // position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  textAlign: "center", // Центрирование текста по горизонтали
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  padding: "10px",
                }}
              >
                <h4>{car.Brand} {car.Model}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarCarousel;
