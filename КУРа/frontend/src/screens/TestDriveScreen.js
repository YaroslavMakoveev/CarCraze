import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTestDrive } from "../redux/slices/testDriveSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

function TestDriveScreen({ match, history }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
  const carDetails = useSelector((state) => state.car.carDetails);
  const { car, loading, error } = carDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    if (car) {
      dispatch(createTestDrive(car._id, userDetails._id, date, time)); // Передаем объект машины вместе с другими данными
      history.push("/profile");
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Запись на тест-драйв</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="dateTime">
            <Form.Label>Дата и время</Form.Label>
            <Form.Control
              type="date"
              value={date}
              min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
              onChange={(e) => setDate(e.target.value)}
            />
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Записаться
          </Button>
        </Form>
      </Col>
      <Col md={6}>
        {car && (
          <div>
            <h2>Информация о машине</h2>
            <p>Бренд: {car.Brand}</p>
            <p>Модель: {car.Model}</p>
            <p>Стоимость: {car.Price}₽</p>
            <p><img src={car.image} alt={car.brand} height='400' /></p>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default TestDriveScreen;

