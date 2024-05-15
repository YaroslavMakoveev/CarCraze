import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTradeIn } from "../redux/slices/tradeInSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

function TradeInScreen({ match, history }) {
  const [selectedCar, setSelectedCar] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
  const carDetails = useSelector((state) => state.car.carDetails);
  const { car, loading, error } = carDetails;

  const userCars = useSelector((state) => state.user.userCars);

  const submitHandler = (e) => {
    e.preventDefault();
    if (car && selectedCar) {
      dispatch(createTradeIn(car._id, selectedCar, userDetails._id)); // Обновлено
      history.push("/profile");
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Трейд-ин</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="selectedCar">
            <Form.Label>Выберите ваш автомобиль</Form.Label>
            <Form.Control
              as="select"
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
            >
              <option value="">Выбрать...</option>
              {userCars.map((userCar) => (
                <option key={userCar._id} value={userCar._id}>
                  {userCar.brand} {userCar.model} ({userCar.year})
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Подтвердить заявку
          </Button>
        </Form>
      </Col>
      <Col md={6}>
        {car && (
          <div>
            <h2>Информация о машине</h2>
            <p>Бренд: {car.Brand}</p> {/* Обновлено */}
            <p>Модель: {car.Model}</p> {/* Обновлено */}
            <p>Стоимость: {car.Price}₽</p> {/* Обновлено */}
            <p><img src={car.image} alt={car.brand} height='400' /></p>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default TradeInScreen;
