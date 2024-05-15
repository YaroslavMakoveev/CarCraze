import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {   removeFromCart } from "../redux/slices/cartSlice";

function CartScreen({   history }) {
 

  const dispatch = useDispatch();

   

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems)
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=placeOrder");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Корзина</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Ваша корзина пуста. <Link to="/">На главную</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.car}>
                <Row>
                  <Col md={4}>
                    <Image src={item.image} alt={item.Brand + ' ' + item.Model} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/car/${item._id}`}>{item.Brand + ' ' + item.Model}</Link>
                  </Col>
                  <Col md={1}>{item.qty}</Col>
                  <Col md={3}>{item.Price}₽</Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Подытог {cartItems.reduce((acc, item) => acc + item.qty, 0)} автомобилей
              </h2>
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.Price, 0)
                .toFixed(2)}₽
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="w-100"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Перейти к размещению
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
