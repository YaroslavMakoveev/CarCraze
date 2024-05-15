import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderDetails } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { fetchUserDetails } from "../redux/slices/userSlice";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);
  //  console.log(cart )
  // PRICE CALCULATIONS
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.Price * item.qty,
    0
  );

  const totalPrice = (
    Number(itemsPrice)
  );

  const data = {
    orderItems: cart.cartItems,
    itemsPrice: itemsPrice.toString(),
    totalPrice: totalPrice.toString(),
  };
  
  
  // console.log(data)
  const placeOrder = () => {
    dispatch(createOrder(data))
      .then(() => {
        setTimeout(() => {
          console.log(orderDetails)
          history.push(`/orderDetail`);
        }, 1000); // Delay of 1 second (1000 milliseconds)
      })
      .catch((error) => {
        // Handle any error that occurred during order creation
      });
  };
  
  return (
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Выбранные автомобили</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Ваша корзина пуста</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image
                            src={item.image}
                            alt={item.Brand + ' ' + item.Model}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/car/${item._id}`}>
                          {item.Brand + ' ' + item.Model}
                          </Link>
                        </Col>
                        <Col md={3}>
                          {(item.Price)}₽
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Сумма заказа</h2>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{itemsPrice.toFixed(2)}₽</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Итого:</Col>
                  <Col>{totalPrice}₽</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Разместить заказ
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
