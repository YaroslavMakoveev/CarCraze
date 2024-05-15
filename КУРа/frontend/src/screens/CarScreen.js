import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCarDetails
  } from "../redux/slices/carSlice";
import { createTestDrive } from "../redux/slices/testDriveSlice"; // Новый action для создания записи на тест-драйв
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";

function CarScreen({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.car.carDetails);
  const { car, loading, error } = carDetails;
  console.log(carDetails)

  const userLogin = useSelector((state) => state.user );
  const { userDetails } = userLogin;

  useEffect(() => {
    dispatch(fetchCarDetails(match.params.id));
  }, [dispatch, match]);

  // console.log(match.params.id);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, qty));
  };
  
  const bookTestDriveHandler = () => {
    // history.push(`/test-drive/${match.params.id}`); // Перенаправляем на страницу записи на тест-драйв с идентификатором автомобиля в URL
    history.push(`/login?redirect=test-drive/${match.params.id}`);
  };

  const tradeInHandler = () => {
    // history.push(`/trade-in/${match.params.id}`);
    history.push(`/login?redirect=trade-in/${match.params.id}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        На главную
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={3}>
              {car && (
                <Image src={car.image} alt={car.Brand + ' ' + car.Model} fluid />
              )}
            </Col>

            <Col md={6}>
              {car && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{car.Brand + ' ' + car.Model}</h3>
                  </ListGroup.Item>

                <ListGroup.Item>Стоимость: {car.Price}₽</ListGroup.Item>

                <ListGroup.Item>
                  Описание: {car.Description}
                </ListGroup.Item>
              </ListGroup>
              )}
            </Col>

            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Стоимость:</Col>
                      <Col>
                        {car && (
                          <strong>{car.Price}₽</strong>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      // disabled={product.countInStock === 0}
                    >
                      Добавить в корзину
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* Кнопка "Book Test Drive" */}
                    <Button onClick={bookTestDriveHandler} className="btn-block" type="button">
                      Записаться на тест-драйв
                    </Button>
                  </ListGroup.Item>
                  {car && car.Trade_in && (
                    <ListGroup.Item>
                      <Button
                        onClick={tradeInHandler}
                        className="btn-block"
                        type="button"
                      >
                        Трейд-ин
                      </Button>
                    </ListGroup.Item>
                  )}

                </ListGroup>
              </Card>
            </Col>
          </Row>

        </div>
      )}
    </div>
  );
}

export default CarScreen;
